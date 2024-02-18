"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarLink({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  const pathname = usePathname();
  const currentPath = pathname.split("/").pop();

  return (
    <Link href={href} className="w-full">
      <div
        className={`p-2 hover:bg-secondary/70 font-roboto text-gray-400 hover:text-foreground/90 rounded-md 
        ${href.endsWith(currentPath ?? "") ? "bg-secondary/70 !text-foreground hover:bg-secondary/60" : ""}`}
      >
        {title}
      </div>
    </Link>
  );
}
