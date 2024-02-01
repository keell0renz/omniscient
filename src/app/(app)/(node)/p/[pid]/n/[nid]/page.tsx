import AIChat from "@/components/node/chat/AIChat";
import { getNodeById } from "@/server/roadmap";

export default async function Page({
  params,
}: {
  params: { pid: string; nid: string };
}) {
  const node = await getNodeById(params.nid);
  return (
    <>
      <AIChat node={node} />
    </>
  );
}
