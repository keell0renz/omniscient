async function page({
    params,
}: {
    params: { project_id: string };
}) {
    return <div>{params.project_id}</div>;
}

export default page;