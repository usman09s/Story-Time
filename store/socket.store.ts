import { create } from "zustand";
import { ChatsListType, ChatTypes, PaginationTypes, SupportMessage } from "@/types/types";
import socketServcies from "@/socket/socket";
import { toast } from "sonner";

interface ChatState {
    chatList: ChatsListType | null;
    chatMessages: { [key: string]: ChatTypes | { data?: { data: SupportMessage[]; pagination: PaginationTypes; } | undefined } | undefined };
    currentChatId: string | null;
    setCurrentChatId: (chatId: string | null) => void;
    fetchChatList: () => void;
    fetchChatMessages: (chatId: string) => void;
    sendMessage: (chatId: string, message: string, file?: File) => void;
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
        const token = localStorage.getItem("access-token");
        if (!token) return;

        socketServcies.initializeSocket(token);

        socketServcies.on("connect", () => {
            console.log("Socket connected");
        });

        socketServcies.on("get-chat-list", (data: ChatsListType) => {
            set({ chatList: data });
        });

        socketServcies.emit("get-chat-list", { page: 1, limit: 6 });
    },
    fetchChatMessages: (chatId: string) => {
        socketServcies.emit("get-chat-messages", { chat: chatId, page: 1, limit: 10000 });

        socketServcies.on(`get-chat-messages-${chatId}`, (data: ChatTypes) => {
    
            set((state) => ({
                chatMessages: {
                    ...state.chatMessages,
                    [chatId]: data, 
                },
            }));
        });
    },
    sendMessage: (chatId: string, message: string, file?: File) => {
        const token = localStorage.getItem("access-token");
        if (!token) return toast.error("Please log in to send messages");
        const payload = { chat: chatId, text: message, media: file };
        // console.log(payload);
        socketServcies.emit("send-message", payload);
        socketServcies.emit("get-chat-messages", { chat: chatId, page: 1, limit: 10000 });
    },
}));
