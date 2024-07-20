import { create } from "zustand";
import { ChatsListType, ChatTypes, SupportMessage } from "@/types/types";
import socketServices from "@/socket/socket";
import socketServcies from "@/socket/socket";
import { toast } from "sonner";

interface ChatState {
  chatList: ChatsListType | null;
  chatMessages: { [key: string]: ChatTypes };
  currentChatId: string | null;
  setCurrentChatId: (chatId: string | null) => void;
  fetchChatList: () => void;
  fetchChatMessages: (chatId: string) => void;
  sendMessage: (chatId: string, message: string, file?: string) => void;
  closeChat: (chatId: string) => void;
}
export const useChatStore = create<ChatState>((set, get) => ({
  chatList: null,
  chatMessages: {},
  currentChatId: null,
  setCurrentChatId: (chatId: string | null) => {
    set({ currentChatId: chatId });
    if (chatId && !get().chatMessages[chatId]) {
      get().fetchChatMessages(chatId);
    }
  },
  fetchChatList: () => {
    
    socketServices.on("get-chat-list", (data: ChatsListType) => {
      set({ chatList: data });
    });
 
    socketServices.emit("get-chat-list", { page: 1, limit: 6 });
  },

  fetchChatMessages: (chatId: string) => {

    socketServcies.on(`send-message`, (data: SupportMessage) => {
      console.log("send-message", data);
    })

    socketServices.on(`send-message-${chatId}`, (data: SupportMessage) => {
      console.log("send-message-SOCKET-ChatID", data);
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

    socketServices.on(`get-chat-messages-${chatId}`, (data: ChatTypes) => {
      console.log("get-chat-messages-SOCKET", data);
      set((state) => ({
        chatMessages: {
          ...state.chatMessages,
          [chatId]: data,
        },
      }));
    });
    
    socketServices.emit("get-chat-messages", { chat: chatId, page: 1, limit: 10000 });
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