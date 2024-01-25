export { default as NavbarLink } from "./Link";

import { Slash } from "lucide-react";
import Cognitar from "@/components/misc/Logo";
import { currentUser } from "@clerk/nextjs";

export async function Navbar({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  return (
    <div className="w-full pt-4 pb-1.5 flex border-b flex-col bg-secondary/25 space-y-2">
      <div className="flex flex-row justify-between mx-6">
        <div className="flex flex-row justify-start space-x-2">
          <Cognitar height="32" width="32" />
          <Slash
            className="-rotate-[14deg] text-gray-700 mt-2"
            width={16}
            height={16}
          />
          <p className="mt-1">{`@${user?.username}`}</p>
        </div>
        <div></div>
      </div>
      <div className="flex flex-row mx-2">{children}</div>
    </div>
  );
}
