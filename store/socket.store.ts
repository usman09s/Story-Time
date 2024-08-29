import { create } from "zustand";
import {
  ChatsListType,
  ChatTypes,
  SupportChatOverview,
  SupportMessage,
} from "@/types/types";

import socketServices from "@/socket/socket";
import { toast } from "sonner";

interface ChatState {
  chatList: SupportChatOverview[] | [];
  isChatListLoading: boolean;
  isInitialLoad: boolean;
  chatMessages: { [key: string]: ChatTypes };
  currentChatId: string | null;
  unreadNotificationsCount: number;
  setCurrentChatId: (chatId: string | null) => void;
  fetchChatList: (search: string) => void;
  fetchChatMessages: (chatId: string) => void;
  sendMessage: (chatId: string, message: string, file?: string) => void;
  closeChat: (chatId: string) => void;
  fetchUnreadNotificationCount: () => void;
  loader: boolean;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chatList: [],
  isChatListLoading: false,
  isInitialLoad: true,
  chatMessages: {},
  currentChatId: null,
  loader: false,
  unreadNotificationsCount: 0,

  setCurrentChatId: (chatId: string | null) => {
    set({ currentChatId: chatId });
    if (chatId && !get().chatMessages[chatId]) {
      get().fetchChatMessages(chatId);
    }
  },
  fetchChatList: (search) => {
    const { isInitialLoad } = get();
    if (isInitialLoad) {
      set({ isChatListLoading: true });
    }

    if (true) {
      socketServices.off("get-chat-list");
      socketServices.on("get-chat-list", (data: ChatsListType) => {

        set({
          chatList: data?.data?.data,
          isChatListLoading: false,
          isInitialLoad: false,
        });

        data &&
          data.data &&
          data.data.data.forEach((chat) => {
            const chatId = chat.chat._id;
            if (!socketServices.hasListeners(`unread-count-${chatId}`)) {
              socketServices.on(
                `unread-count-${chatId}`,
                (unreadCountData: any) => {
                  console.log(
                    `Unread count for chat ${chatId}:`,
                    unreadCountData
                  );
                  set((state) => {
                    return {
                      chatList: state.chatList.map((chatItem) =>
                        chatItem.chat._id === chatId
                          ? {
                              ...chatItem,
                              unreadMessages: unreadCountData.unreadCount,
                            }
                          : chatItem
                      ),
                    };
                  });
                }
              );
            }
          });
      });
    }

    // Check and set up listener for 'create-chat' if not already set up
    if (!socketServices.hasListeners("create-chat")) {
      socketServices.off("create-chat");
      socketServices.on("create-chat", (data: SupportChatOverview) => {
        console.log("Create-Chat Support", data);
        set((state) => {
          const chatExists = state.chatList.some(
            (chatItem) => chatItem.chat._id === data.chat._id
          );

          if (!chatExists) {
            return {
              chatList: [data, ...state.chatList],
            };
          }

          return state;
        });
      });
    }

    // Emit the request to get the chat list
    socketServices.emit("get-chat-list", { page: 1, limit: 6, search });
  },

  fetchChatMessages: (chatId: string) => {
    const sendMessageEvent = `send-message-${chatId}`;
    const getChatMessagesEvent = `get-chat-messages-${chatId}`;

    socketServices.off(sendMessageEvent);
    socketServices.off(getChatMessagesEvent);
    set({ loader: true });
    socketServices.on(sendMessageEvent, (data: SupportMessage) => {
      set((state) => ({
        chatMessages: {
          ...state.chatMessages,
          [chatId]: {
            ...state.chatMessages[chatId],
            data: {
              ...state.chatMessages[chatId].data,
              data: [...state.chatMessages[chatId].data.data, data],
            },
          },
        },
      }));
    });

    socketServices.on(getChatMessagesEvent, (data: ChatTypes) => {
      set((state) => ({
        chatMessages: {
          ...state.chatMessages,
          [chatId]: data,
        },
      }));
    });

    socketServices.emit("get-chat-messages", {
      chat: chatId,
      page: 1,
      limit: 20,
    });
    setTimeout(() => {
      set((state) => {
        if (state.loader) {
          return { loader: false };
        }
        return state;
      });
    }, 1000);
  },

  fetchUnreadNotificationCount: () => {
    socketServices.off("unread-notifications-count");
    socketServices.on("unread-notifications-count", (data: any) => {
      console.log("Unread Notifications Count", data["unreadCount"]);
      set({ unreadNotificationsCount: data["unreadCount"] }); 
    });
  },

  sendMessage: (chatId: string, message: string, file?: string) => {
    const payload = { chat: chatId, text: message, media: file };
    socketServices.emit(`send-message`, payload);
  },

  closeChat: (chatId: string) => {
    console.log("close-chat", chatId);
    socketServices.emit("close-chat", { chat: chatId });
    toast.success("Chat closed successfully");
  },
}));
