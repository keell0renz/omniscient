import { Navbar, NavbarLink } from "@/components/project/navbar";
import { getProjectById } from "@/server/project";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { pid: string };
}) {
  const project = await getProjectById(params.pid);

  if (!project) notFound();

  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar title={project?.title}>
        <NavbarLink href="/projects" title="Dashboard" />
        <NavbarLink href={`/p/${params.pid}`} title="Roadmap" />
      </Navbar>
      <div className="w-full h-full overflow-hidden">{children}</div>
    </div>
  );
}
