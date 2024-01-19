import Link from "next/link";

interface NavbarLinkProps {
  path: string;
  name: string;
}

const NavbarLink = ({ name, path }: NavbarLinkProps) => {
  return (
    <Link
      href={path}
      className="text-foreground/80 hover:text-foreground transition-all duration-200"
    >
      {name}
    </Link>
  );
};

export default NavbarLink;
