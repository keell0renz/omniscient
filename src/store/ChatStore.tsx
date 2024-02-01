import { create } from "zustand";
import type { Chat } from "@prisma/client";
import { Message as MessageSchema } from "ai"

interface ChatStore {
    currentChat: Chat | null;
    chatMessages: MessageSchema[] | null
    setCurrentChat: (chat: Chat | null) => void;
    setChatMessages: (messages: MessageSchema[] | null) => void;
}

const useChatStore = create<ChatStore>((set) => ({
    currentChat: null,
    chatMessages: null,
    setCurrentChat: (chat: Chat | null) => set({ currentChat: chat }),
    setChatMessages: (messages: MessageSchema[] | null) => set({ chatMessages: messages }),
}));

export default useChatStore;
