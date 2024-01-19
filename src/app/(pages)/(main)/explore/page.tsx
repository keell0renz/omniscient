"use client"
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const page = () => {
    const { toast } = useToast()

    const handleClick = () => {
        toast({
            title: "🚀 In development!",
            description: "This functionality is currently in development, check out later. 😊",
            className: "bg-blue-600 text-white",
        })
    }

    return (
        <div className="home overflow-hidden h-fit bg-transparent mx-auto box-border max-w-10xl w-full -mt-10 flex flex-col">
            <h1 className="text-center text-6xl font-bold">Search any Project you want to</h1>
            <div className="flex mt-16 justify-center items-center" onClick={() => handleClick()}>
                <Input className="bg-background outline-none focus-visible:outline-none border border-muted-foreground p-5 mx-2 max-w-[900px]" />
                <SearchIcon className="w-5 h-5 -translate-x-10 cursor-pointer" />
            </div>
        </div>
    );
};

export default page;