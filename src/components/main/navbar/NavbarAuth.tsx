"use client";
import { useUser } from "@clerk/nextjs";
import UserAccount from "@/components/main/navbar/UserAccount";
import Link from "next/link";

const NavbarAuth = () => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <Link href="/sign-in" className="transition-all duration-200">
        <div className="border rounded-2xl py-1 px-3 shadow-md shadow-blue-700 hover:shadow-none transition-all duration-200 text-foreground hover:text-foreground/80">
          Sign in
        </div>
      </Link>
    );
  }

  return (
    <div className="flex flex-row gap-2 items-center justify-center flex-nowrap">
      <UserAccount />
    </div>
  );
};

export default NavbarAuth;
