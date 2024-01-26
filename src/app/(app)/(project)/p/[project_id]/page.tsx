export default async function Page({
  params,
}: {
  params: { project_id: string };
}) {
  return <div>{params.project_id}</div>;
}
