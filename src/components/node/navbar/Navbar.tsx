
export default async function Navbar({ children }: { children: React.ReactNode }) {
    return (
      <div className="h-full w-72 flex flex-col pt-4 overflow-scroll">{children}</div>
    );
  }
  