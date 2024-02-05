"use client"
import type { Chat } from "@prisma/client";
import ChatPopover from "@/components/node/chat/ChatPopover";
import { useRouter } from "next/navigation";

const Chat = ({
    chat,
    pid,
    nid,
    cid
}: {
    chat: Chat,
    pid: string,
    nid: string,
    cid: string,
}) => {
    const router = useRouter();

    async function handleChatClick(chat: Chat, target: any) {
        if (!cid && target.id !== "moreHorizontal") {
            const newPath = `/p/${pid}/n/${nid}/c/${chat.id}`;
            router.push(newPath);
        }
    }

    return (
        <div
            key={chat.id}
            className="cursor-pointer group py-2 px-2 rounded-lg hover:bg-secondary flex flex-row justify-between items-center"
            onClick={(e) => handleChatClick(chat, e.target)}
        >
            <h1 className="text-sm truncate w-64">{chat.title}</h1 >
            <ChatPopover chat={chat} />
        </div >
    );
};

export default Chat;