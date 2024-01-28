import Cognitar from "@/components/misc/Logo";
import { SquarePen } from "lucide-react";
import Link from "next/link";

async function NavbarChild({
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

async function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-72 space-y-2 flex flex-col pt-4">{children}</div>
  );
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { pid: string; nid: string };
}) {
  return (
    <div className="flex flex-row h-screen w-screen">
      <Navbar>
        <NavbarChild className="flex flex-row justify-between items-center">
          <Link href={`/p/${params.pid}/${params.nid}`}>
            <div className="flex flex-row justify-start space-x-2">
              <Cognitar height="26" width="26" />
              <h1 className="font-semibold">Omniscient</h1>
            </div>
            <SquarePen height={16} width={16} />
          </Link>
        </NavbarChild>
      </Navbar>
      <div className="h-full w-full bg-slate-600/10">{children}</div>
    </div>
  );
}
