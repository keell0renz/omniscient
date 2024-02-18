import { NavbarUser, NavbarPathBase } from "../../shared/navbar";
import NavbarProject from "./NavbarProject";

export default function NavbarPath() {
  return (
    <NavbarPathBase>
      <NavbarUser />
      <NavbarProject />
    </NavbarPathBase>
  );
}
