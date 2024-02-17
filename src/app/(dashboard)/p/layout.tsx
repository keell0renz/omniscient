import Navbar from "@/components/dashboard/navbar/Navbar";
import NavbarLink from "@/components/dashboard/navbar/NavbarLink";

type DashboardNavbarProps = {
    children: React.ReactNode,
};

export default async function Layout({ children }: DashboardNavbarProps) {
    return (
        <>
            <Navbar>
                <NavbarLink href="/" title="Home" />
                <NavbarLink href="/p" title="Roadmap" />
                <NavbarLink href="/settings" title="Settings" />
                <div className="ml-auto">
                    <NavbarLink href="/projects" title="My projects" />
                    <NavbarLink href="/explore" title="Explore new" />
                </div>
            </Navbar>
            <div className="overflow-x-hidden min-h-[80vh] container mx-auto">
                {children}
            </div>
        </>
    );
}