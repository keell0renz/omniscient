"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarLink({ title, href }: { title: string, href: string }) {
    const pathname = usePathname();
    const currentPath = pathname.split("/").pop();

  return (
    <Link href={href} className="w-full">
      <div
        className={`p-2 hover:bg-muted-foreground/10 rounded-md 
        ${href.endsWith(currentPath ?? "") ? "bg-muted-foreground/10" : ""}`}
      >
        {title}
      </div>
    </Link>
  );
}