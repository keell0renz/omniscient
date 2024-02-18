"use client";

import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function NavbarUser() {
  const { user, isLoaded } = useUser();

  return (
    <>
      {isLoaded ? (
        <Link href="#" className="mt-1 hover:underline hover:underline-offset-4 cursor-pointer">{`@${user?.username}`}</Link>
      ) : (
        <Skeleton className="w-20 h-4 my-auto" />
      )}
    </>
  );
}
