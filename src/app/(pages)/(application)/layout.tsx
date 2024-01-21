import Navbar from "@/components/application/navbar/Navbar";
import NavbarLink from "@/components/application/navbar/NavbarLink";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>

            <Navbar>
                <NavbarLink
                    href="/"
                    title="Home"
                />
                <NavbarLink
                    href="/projects"
                    title="Projects"
                />
                {/* <NavbarLink
                    href="/articles"
                    title="Articles"
                /> */}
            </Navbar>
            <div className="pt-16 min-h-screen overflow-hidden container mx-auto">
                {children}
            </div>
        </>
    );
}
