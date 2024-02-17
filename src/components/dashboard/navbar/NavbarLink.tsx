"use client"
import { useParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NavbarLinkProps {
    title: string;
    href: string;
}

export default function NavbarLink({ title, href }: NavbarLinkProps) {
    const pathname = usePathname();
    const params = useParams();

    if (href === "/settings" || href === "/p" && params.project_id) {
        // handle dynamic route
        const newHref = `/p/${params.project_id}${href === "/settings" ? "/settings/general" : ""}`;
        return (
            <Button
                variant="ghost"
                className={newHref === pathname ? "font-semibold text-md underline underline-offset-8" : "text-gray-400 text-sm"}
                asChild
            >
                <Link href={newHref}>
                    {title}
                </Link>
            </Button >
        );
    }

    return (
        <Button
            variant="ghost"
            className={href === pathname ? "font-semibold text-md underline underline-offset-8" : "text-gray-400 text-sm"}
            asChild
        >
            <Link href={href}>{title}</Link>
        </Button>
    );
}