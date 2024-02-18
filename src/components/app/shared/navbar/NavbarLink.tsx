"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NavbarLinkProps {
  title: string;
  href: string;
}

export default function NavbarLink({ title, href }: NavbarLinkProps) {
  const pathname = usePathname();
  const isCurrent = pathname === href || (pathname.split("/")[3] === "settings" && href.split("/")[3] === "settings");

  return (
    <Button
      variant="ghost"
      className={isCurrent ? "font-semibold" : "text-gray-400"}
      asChild
    >
      <Link href={href}>{title}</Link>
    </Button>
  );
}
