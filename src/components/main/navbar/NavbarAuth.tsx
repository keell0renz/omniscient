"use client";
import { useUser } from "@clerk/nextjs";
import UserAccount from "@/components/main/navbar/UserAccount";
import Link from "next/link";

const NavbarAuth = () => {
    const { isSignedIn } = useUser();

    if (!isSignedIn) {
        return (
            <Link
                href="/sign-in"
                className="text-foreground hover:text-foreground/80 transition-all duration-200"
            >
                Sign in
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
