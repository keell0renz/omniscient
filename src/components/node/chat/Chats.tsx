import { getListOfChatsByNodeId } from "@/server/chats";
import Chat from "@/components/node/chat/Chat";
import NavbarAddChat from "@/components/node/chat/NavbarAddChat";

export default async function Chats({
  params,
}: {
  params: { pid: string; nid: string, cid: string };
}) {
  const chats = await getListOfChatsByNodeId(params.nid);

  return (
    <div className="flex flex-col pt-4 space-y-1 overflow-y-auto">
      <p className="text-sm text-gray-400 pl-4 inline-flex justify-between">
        Chats
        <NavbarAddChat pid={params.pid} nid={params.nid} />
      </p>
      <div className="flex flex-col justify-start ml-2 mr-1">
        {chats?.map((chat) => (
          <Chat
            key={chat.id}
            pid={params.pid}
            nid={params.nid}
            cid={params.cid}
            chat={chat}
          />
        ))}
      </div>
    </div>
  );
}
