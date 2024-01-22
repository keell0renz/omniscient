import { Navbar, NavbarLink } from "@/components/dashboard/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar>
        <NavbarLink href="/" title="Home" />
        <NavbarLink href="/projects" title="Projects" />
      </Navbar>
      <div className="mt-8 mx-72">{children}</div>
    </>
  );
}
