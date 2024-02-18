import { NavbarUser, NavbarPathBase } from "../../shared/navbar";
import NavbarProject from "./NavbarProject";
import { Slash } from "lucide-react";

export default function NavbarPath() {
  return (
    <NavbarPathBase>
      <NavbarUser />
      <Slash
        className="-rotate-[14deg] text-gray-700 mt-2"
        width={16}
        height={16}
      />
      <NavbarProject />
    </NavbarPathBase>
  );
}
