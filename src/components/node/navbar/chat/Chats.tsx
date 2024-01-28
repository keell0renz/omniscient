import Chat from "./Chat";

export default function Chats({
  params,
}: {
  params: { pid: string; nid: string };
}) {
  return (
    <div className="flex flex-col pt-4 space-y-1 overflow-y-auto">
      <p className="text-sm text-gray-400 pl-4">Chats</p>
      <div className="flex flex-col justify-start ml-2 mr-1">
        <Chat />
      </div>
    </div>
  );
}
