import { Slash } from "lucide-react";
import Cognitar from "@/components/main/Logo";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { currentUser } from "@clerk/nextjs";

export default async function NavbarPath() {
    const user = await currentUser();

    return (
        <div className="flex flex-row justify-start space-x-2">
            <Link href="/">
                <Cognitar height="32" width="32" />
            </Link>
            <Slash
                className="-rotate-[14deg] text-gray-700 mt-2"
                width={16}
                height={16}
            />
            {user
                ? <p className="mt-1">{`@${user?.username}`}</p>
                : <Skeleton className="w-20 h-4 my-auto" />
            }
        </div>
    );
}