"use client"

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NavbarLinkProps {
    title: string;
    href: string;
  }
  
  export default function NavbarLink({ title, href }: NavbarLinkProps) {
    const pathname = usePathname();
  
    return (
      <Button
        variant="ghost"
        className={pathname === href ? "font-semibold" : "text-gray-400"}
        asChild
      >
        <Link href={href}>{title}</Link>
      </Button>
    );
  }