import { Navbar, NavbarLink } from "@/components/project/navbar";
import { getProjectById } from "@/server/project";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { project_id: string };
}) {
  const project = await getProjectById(params.project_id);

  if (!project) notFound();

  return (
    <>
      <Navbar title={project?.title}>
        <NavbarLink href="/projects" title="Dashboard" />
        <NavbarLink href={`/p/${params.project_id}`} title="Projects" />
      </Navbar>
      <div className="mt-8 min-h-screen overflow-x-hidden container mx-auto">
        {children}
      </div>
    </>
  );
}
