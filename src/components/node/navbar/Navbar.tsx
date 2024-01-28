import NewChat from "./NewChat";
import AIContext from "./AIContext";

export default async function Navbar({
  params,
}: {
  params: { pid: string; nid: string };
}) {
  return (
    <div className="h-full w-72 flex flex-col justify-start pt-4 ml-2">
      <div className="flex flex-col justify-start">
        <NewChat {...params} />
        <AIContext {...params} />
      </div>
      <div className="h-full flex flex-col justify-start overflow-scroll">
        <></>
      </div>
    </div>
  );
}
