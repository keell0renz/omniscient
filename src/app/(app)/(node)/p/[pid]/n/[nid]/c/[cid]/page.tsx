import AIChat from "@/components/node/chat/AIChat";
import { getNodeById } from "@/server/roadmap";
import { getMessagesByChat } from "@/server/chats";
import { redirect } from "next/navigation";

export default async function Page({
    params,
}: {
    params: { pid: string, nid: string, cid: string };
}) {
    const node = await getNodeById(params.nid);
    const messages = await getMessagesByChat(params.cid)

    if (messages.length < 4) {
        const newPath = `/p/${params.pid}/n/${params.nid}/c`;
        redirect(newPath);
    }

    return (
        <>
            <AIChat node={node} chatMessages={messages} />
        </>
    )
}
