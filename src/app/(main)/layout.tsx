import { NavbarLink, Navbar } from "@/components/main/navbar";
import Gradient from "@/components/main/Gradient";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar>
        <NavbarLink name="Explore" path="/explore" />
        <NavbarLink name="Mission" path="/mission" />
      </Navbar>
      <div className="pt-40 min-h-screen overflow-x-hidden container">
        {children}
      </div>
      <div className="pointer-events-none">
        <Gradient />
      </div>
    </>
  );
}
