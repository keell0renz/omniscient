import { Roadmap } from "@/components/roadmap";
import { getNodesByProjectId, getEdgesByProjectId } from "@/server/roadmap";

export default async function Page({
  params,
}: {
  params: { pid: string };
}) {
  const [nodes, edges] = await Promise.all([
    getNodesByProjectId(params.pid),
    getEdgesByProjectId(params.pid),
  ]);

  return <Roadmap nodes={nodes} edges={edges} project_id={params.pid} />;
}
