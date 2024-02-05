"use client"
import { PlusCircleIcon } from "lucide-react";
import { useRouter, usePathname } from 'next/navigation'

const NavbarAddChat = ({ pid, nid }: { pid: string, nid: string }) => {
    const router = useRouter();
    const currentPath = usePathname();


    function handleClick() {
        const newPath = `/p/${pid}/n/${nid}/c`;
        newPath === currentPath ? window.location.reload() : router.push(newPath);
    }

    return (
        <PlusCircleIcon
            className="h-5 w-5 cursor-pointer"
            onClick={() => handleClick()}
        />
    );
};

export default NavbarAddChat;