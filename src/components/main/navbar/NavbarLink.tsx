import Link from "next/link";

interface NavbarLinkProps {
  path: string;
  name: string;
}

export default function NavbarLink({ name, path }: NavbarLinkProps) {
  return (
    <Link
      href={path}
      className="text-foreground/80 hover:text-foreground transition-all duration-200"
    >
      {name}
    </Link>
  );
}
