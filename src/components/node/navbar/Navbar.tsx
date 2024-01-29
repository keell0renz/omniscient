import NewChat from "./NewChat";
import AIContext from "./AIContext";
import Chats from "./chat/Chats";
export default async function Navbar({
  params,
}: {
  params: { pid: string; nid: string };
}) {
  return (
    <div className="h-full w-72 flex flex-col justify-start pt-4 mx-2">
      <div className="flex flex-col justify-start">
        <NewChat params={params} />
        <AIContext params={params} />
      </div>
      <div className="flex flex-col flex-grow overflow-hidden">
        <Chats params={params} />
      </div>
    </div>
  );
}
