import { Navbar, NavbarLink } from "@/components/app/project/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar>
        <NavbarLink href="/dashboard/projects" title="Projects" />
        <NavbarLink href="/" title="Projects" />
      </Navbar>
      <main className="overflow-x-hidden min-h-[80vh] container mx-auto">
        {children}
      </main>
    </>
  );
}
