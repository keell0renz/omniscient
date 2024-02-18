import {
  Navbar,
  NavbarLink,
  NavbarPath,
} from "@/components/app/project/navbar";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <>
      <Navbar NavbarPath={<NavbarPath />}>
        <NavbarLink href="/dashboard/projects" title="Projects" />
        <NavbarLink href={`/p/${params.id}`} title="Roadmap" />
        <NavbarLink
          href={`/p/${params.id}/settings/general`}
          title="Settings"
        />
      </Navbar>
      <main className="overflow-x-hidden min-h-[80vh] container mx-auto">
        {children}
      </main>
    </>
  );
}
