import Navbar from "@/components/dashboard/navbar/Navbar";
import NavbarLink from "@/components/dashboard/navbar/NavbarLink";

type DashboardNavbarProps = {
    children: React.ReactNode,
};

export default async function Layout({ children }: DashboardNavbarProps) {
    return (
        <>
            <Navbar>
                <NavbarLink href="/projects" title="My projects" />
                <NavbarLink href="/explore" title="Explore new" />
                <NavbarLink href="/articles" title="Articles" />
            </Navbar>
            <div className="overflow-x-hidden min-h-[80vh] container mx-auto">
                {children}
            </div>
        </>
    );
}