import Link from "next/link";
import Cognitar from "@/components/misc/Logo";

export default async function NewChat({
  params,
}: {
  params: { pid: string; nid: string };
}) {
  return (
    <div className="px-4 py-2 rounded-lg hover:bg-secondary">
      <Link
        href={`/p/${params.pid}`}
        className="flex flex-row justify-between items-center"
      >
        <div className="flex flex-row justify-start space-x-2">
          <Cognitar height="24" width="24" />
          <h1 className="font-semibold">Omniscient</h1>
        </div>
      </Link>
    </div>
  );
}
