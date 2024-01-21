"use client"
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";

const NavbarPath = () => {
    const { user } = useUser();

    if (!user) return (
        <Skeleton className="h-4 w-[100px]" />
    );

    return (
        <>
            <p className="cursor-pointer">@{user.username}</p>
        </>
    );
};

export default NavbarPath;