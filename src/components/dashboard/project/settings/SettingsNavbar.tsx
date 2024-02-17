"use client"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function SettingsNavbar() {
    const { project_id } = useParams();

    const pathname = usePathname();
    const currentPath = pathname.split("/").pop();

    const settings = [
        {
            title: "General",
            href: "general"
        },
        {
            title: "Share",
            href: "share"
        },
        {
            title: "Context",
            href: "context"
        },
        {
            title: "Danger",
            href: "danger"
        },
    ]

    return (
        <div className="w-96 px-12 mt-20 flex flex-col gap-2 text-lg h-full items-start font-mono">
            {settings.map((setting) => (
                <Link key={setting.href} className="w-full" href={`/p/${project_id}/settings/${setting.href}`}>
                    <div
                        className={`p-2 hover:bg-muted-foreground/10 rounded-md 
                        ${setting.href === currentPath ? "bg-muted-foreground/10" : ""}`}
                    >
                        {setting.title}
                    </div>
                </Link>
            ))}
        </div>
    );
}