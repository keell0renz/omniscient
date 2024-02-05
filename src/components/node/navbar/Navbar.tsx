import NewChat from "./NewChat";
import AIContext from "./AIContext";
import Chats from "../chat/Chats";
import { getNodeById } from "@/server/roadmap";

export default async function Navbar({
  params,
}: {
  params: { pid: string; nid: string, cid: string };
}) {
  const node = await getNodeById(params.nid)

  return (
    <div className="h-full w-72 flex flex-col justify-start pt-4 mx-2">
      <div className="flex flex-col justify-start">
        <NewChat params={params} />
        <AIContext params={params} ai_context={node.ai_context || ""} />
      </div>
      <div className="flex flex-col flex-grow overflow-hidden">
        <Chats params={params} />
      </div>
    </div>
  );
}
