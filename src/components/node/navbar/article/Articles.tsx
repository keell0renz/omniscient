import Article from "./Article";

export default function Articles({
  params,
}: {
  params: { pid: string; nid: string };
}) {
  return (
    <div className="flex flex-col pt-4 space-y-1 overflow-y-auto">
      <p className="text-sm text-gray-400 pl-4">Articles</p>
      <div className="flex flex-col justify-start ml-2 mr-1">
        <Article />
      </div>
    </div>
  );
}
