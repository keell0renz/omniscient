import Link from "next/link";
import Cognitar from "@/components/misc/Logo";
import { NavbarAuth } from "@/components/main/navbar";

interface NavbarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <div className="fixed left-0 right-0 mx-auto max-w-[1398px] pt-1 px-3 h-[58px] backdrop-blur-sm grid grid-cols-3 z-50">
      <div className="col-start-1 col-end-2 flex items-center flex-nowrap justify-self-start">
        <Link href="/" className="inline-flex items-center p-2 rounded-2xl">
          <Cognitar height="16" width="16" />
          <span className="ml-2 flex items-center flex-nowrap">
            <p className="font-semibold">Cognitar</p>
          </span>
        </Link>
      </div>

      <div className="col-start-3 col-end-4 flex justify-end items-center gap-5">
        {children}
        <NavbarAuth />
      </div>
    </div>
  );
}
