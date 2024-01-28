import NavbarChild from "./NavbarChild";
import Link from "next/link";
import Cognitar from "@/components/misc/Logo";
import { SquarePen } from "lucide-react";

export default async function NewChat({ pid, nid }: { pid: string; nid: string }) {
    return (
      <NavbarChild>
        <Link
          href={`/p/${pid}/n/${nid}`}
          className="flex flex-row justify-between items-center"
        >
          <div className="flex flex-row justify-start space-x-2">
            <Cognitar height="24" width="24" />
            <h1 className="font-semibold">Omniscient</h1>
          </div>
          <SquarePen height={16} width={16} />
        </Link>
      </NavbarChild>
    );
  }