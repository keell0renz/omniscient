export default async function NavbarChild({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-4 py-2 rounded-lg hover:bg-secondary ${className}`}>
      {children}
    </div>
  );
}
