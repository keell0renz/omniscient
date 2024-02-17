import { Slash } from "lucide-react";
import Cognitar from "@/components/main/Logo";
import Link from "next/link";
import NavbarUser from "./NavbarUser";

export default async function NavbarPath() {
  return (
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
    </div>
  );
}
