import { NavbarUser } from "../../shared/navbar";
import NavbarProject from "./NavbarProject";
import { Slash } from "lucide-react";
import Cognitar from "@/components/main/Logo";
import Link from "next/link";

export default function Navbar({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <nav className="w-full pt-4 pb-1.5 flex border-b flex-col bg-background-secondary space-y-2">
        <div className="flex flex-row justify-between mx-6">
        <div className="flex flex-row justify-start space-x-2">
      <Link href="/">
        <Cognitar height="32" width="32" />
      </Link>
      <Slash
        className="-rotate-[14deg] text-gray-700 mt-2"
        width={16}
        height={16}
      />
      <NavbarUser />
      <Slash
        className="-rotate-[14deg] text-gray-700 mt-2"
        width={16}
        height={16}
      />
      <NavbarProject />
    </div>
        </div>
        <div className="flex flex-row mx-2">{children}</div>
      </nav>
    );
  }