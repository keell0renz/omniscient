export default function Navbar({
  children,
  NavbarPath,
}: {
  children: React.ReactNode;
  NavbarPath: React.ReactNode;
}) {
  return (
    <nav className="w-full pt-4 pb-1.5 flex border-b flex-col bg-background-secondary space-y-2">
      <div className="flex flex-row justify-between mx-6">{NavbarPath}</div>
      <div className="flex flex-row mx-2">{children}</div>
    </nav>
  );
}
