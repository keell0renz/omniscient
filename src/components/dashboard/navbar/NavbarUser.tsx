"use client"

import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

export default function NavbarUser() {
    const { user, isLoaded } = useUser()

    return (
        <>
            { isLoaded
                ? <p className="mt-1">{`@${user?.username}`}</p>
                : <Skeleton className="w-20 h-4 my-auto" />
            }
        </>
    )
}