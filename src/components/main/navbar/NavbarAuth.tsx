"use client";
import { useUser } from "@clerk/nextjs";
import UserAccount from "@/components/main/navbar/UserAccount";
import Link from "next/link";

export default function NavbarAuth() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="flex flex-row justify-start items-center gap-4">
        <Link href="/sign-in" className="transition-all duration-200">
          <div className="whitespace-nowrap border rounded-2xl py-1 px-3 shadow-md shadow-blue-700 hover:shadow-none transition-all duration-200 text-foreground hover:text-foreground/80">
            Sign in
          </div>
        </Link>
        <Link href="/sign-up" className="transition-all duration-200">
          <div className="font-semibold whitespace-nowrap border rounded-2xl py-1 px-3 shadow-md shadow-yellow-300 hover:shadow-none transition-all duration-200 text-foreground hover:text-foreground/80">
            Get Started
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-2 items-center justify-center flex-nowrap">
      <UserAccount />
    </div>
  );
}
