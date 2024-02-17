import { Navbar, NavbarLink} from "@/components/dashboard/navbar";

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar>
                <NavbarLink href="/" title="Home" />
                <NavbarLink href="/dashboard/projects" title="Projects" />
            </Navbar>
            <div className="overflow-x-hidden min-h-[80vh] container mx-auto">
                {children}
            </div>
        </>
    );
}