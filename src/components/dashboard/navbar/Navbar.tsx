import NavbarPath from "@/components/dashboard/navbar/NavbarPath";

export default async function Navbar({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full pt-4 pb-1.5 flex border-b flex-col bg-secondary/25 space-y-2">
            <div className="flex flex-row justify-between mx-6">
                <NavbarPath />
            </div>
            <div className="flex flex-row mx-2">{children}</div>
        </div>
    );
}