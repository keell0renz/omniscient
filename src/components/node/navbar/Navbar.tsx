import NewChat from "./NewChat";
import AIContext from "./AIContext";

export default async function Navbar({
  params,
}: {
  params: { pid: string; nid: string };
}) {
  return (
    <div className="h-full w-72 flex flex-col justify-start pt-4 mx-2">
      <div className="flex flex-col justify-start">
        <NewChat {...params} />
        <AIContext {...params} />
      </div>
      <div className="flex flex-col flex-grow overflow-hidden">
        <div className="flex flex-col pt-2 space-y-1 overflow-y-auto">
          <p className="text-sm text-gray-400 pl-4">Articles</p>
          <div className="flex flex-col justify-start ml-2 mr-1">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="text-sm py-2 px-2 rounded-lg hover:bg-secondary"
              >
                Article
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col pt-2 space-y-1 overflow-y-auto">
          <p className="text-sm text-gray-400 pl-4">Chats</p>
          <div className="flex flex-col justify-start ml-2 mr-1">
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="text-sm py-2 px-2 rounded-lg hover:bg-secondary"
              >
                New Chat
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
