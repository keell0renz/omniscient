import { Roadmap } from "@/components/roadmap";
import { NodeManage } from "@/components/roadmap";
import { getNodesByProjectId, getEdgesByProjectId } from "@/server/roadmap";

export default async function Page({
  params,
}: {
  params: { project_id: string };
}) {
  const [nodes, edges] = await Promise.all([
    getNodesByProjectId(params.project_id),
    getEdgesByProjectId(params.project_id),
  ]);
  return (
    <>
      <Roadmap nodes={nodes} edges={edges} />
      <NodeManage />
    </>
  );
}
