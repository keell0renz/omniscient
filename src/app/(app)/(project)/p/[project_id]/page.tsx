import { Roadmap } from "@/components/roadmap";

export default async function Page({
  params,
}: {
  params: { project_id: string };
}) {
  return <Roadmap project_id={params.project_id} />;
}
