import { Navbar, NavbarLink } from "@/components/app/project/settings/navbar";

export default async function Layout({ children, params }: { children: React.ReactNode, params: { id: string }}) {
    return (
        <div className="overflow-hidden container w-full h-full flex flex-row">
            <Navbar>
                <NavbarLink title="General" href={`/p/${params.id}/settings/general`}/>
                <NavbarLink title="Share" href={`/p/${params.id}/settings/share`}/>
                <NavbarLink title="Context" href={`/p/${params.id}/settings/context`}/>
                <NavbarLink title="Danger" href={`/p/${params.id}/settings/danger`}/>
            </Navbar>
            <div className="w-full min-h-[60vh] mx-auto flex justify-center">
                {children}
            </div>
        </div>
    );
}