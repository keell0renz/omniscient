import { Navbar, NavbarLink } from "@/components/app/project/navbar";
import { getProjectById } from "@/server/projects";
import { notFound } from "next/navigation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const project = await getProjectById(params.id);

  if (!project) notFound();

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["project", params.id],
    initialData: project,
  });

  return (
    <>
      <Navbar>
        <NavbarLink href="/dashboard/projects" title="Projects" />
        <NavbarLink href={`/p/${params.id}`} title="Roadmap" />
        <NavbarLink
          href={`/p/${params.id}/settings/general`}
          title="Settings"
        />
      </Navbar>
      <main className="overflow-x-hidden min-h-[80vh] container mx-auto">
        <HydrationBoundary state={dehydrate(queryClient)}>
          {children}
        </HydrationBoundary>
      </main>
    </>
  );
}
