import Link from "next/link";

interface NavbarLinkProps {
  path: string;
  name: string;
}

const NavbarLink = ({ name, path }: NavbarLinkProps) => {
  return (
    <Link
      href={path}
      className="text-foreground hover:text-foreground/80 transition-all duration-200"
    >
      {name}
    </Link>
  );
};

export default NavbarLink;
