import Cognitar from "@/components/Logo";
import { Slash } from "lucide-react";
import NavbarPath from "./NavbarPath";
import Link from "next/link";

interface NavbarProps {
    children: React.ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
    return (
        <div className="w-full pt-4 pb-1.5 flex border-b flex-col bg-secondary/30 space-y-2">
            <div className="flex flex-row justify-between mx-6">
                <div className="flex flex-row justify-start items-center gap-2">
                    <Link href="/">
                        <Cognitar height="32" width="32" />
                    </Link>
                    <Slash
                        className="-rotate-[14deg] text-gray-700 mt-2"
                        width={16}
                        height={16}
                    />
                    <NavbarPath />
                </div>
            </div>
            <div className="flex flex-row mx-2">{children}</div>
        </div>
    );
};

export default Navbar;
