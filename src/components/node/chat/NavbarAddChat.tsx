"use client"
import useChatStore from "@/store/ChatStore";
import { PlusCircleIcon } from "lucide-react";

const NavbarAddChat = () => {
    const { setCurrentChat } = useChatStore();

    function handleClick() {
        setCurrentChat(null);
        window.location.reload();
    }

    return (
        <PlusCircleIcon
            className="h-5 w-5 cursor-pointer"
            onClick={() => handleClick()}
        />
    );
};

export default NavbarAddChat;