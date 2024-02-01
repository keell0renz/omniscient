"use client"
import type { Chat } from "@prisma/client";
import ChatPopover from "@/components/node/chat/ChatPopover";
import useChatStore from "@/store/ChatStore";
import { getMessagesByChat } from "@/server/chats";

const Chat = ({
    chat,
}: {
    chat: Chat,
}) => {
    const { setCurrentChat, setChatMessages } = useChatStore();

    async function handleChatClick(chat: Chat) {
        setCurrentChat(chat);
        const messages = await getMessagesByChat(chat.id)
        setChatMessages(messages);
    }

    return (
        <div
            key={chat.id}
            className="cursor-pointer group py-2 px-2 rounded-lg hover:bg-secondary flex flex-row justify-between items-center"
            onClick={() => handleChatClick(chat)}
        >
            <h1 className="text-sm truncate w-64">{chat.title}</h1 >
            <ChatPopover chat={chat} />
        </div >
    );
};

export default Chat;