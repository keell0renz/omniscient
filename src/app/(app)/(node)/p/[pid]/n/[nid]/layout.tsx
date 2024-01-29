import { Navbar } from "@/components/node/navbar";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { pid: string; nid: string };
}) {
  return (
    <div className="flex flex-row h-screen w-screen">
      <Navbar params={params} />
      <div className="h-full w-full bg-slate-600/10 overflow-x-hidden relative">{children}</div>
    </div>
  );
}
