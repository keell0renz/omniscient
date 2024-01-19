"use client"
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

const ExploreSearch = () => {
    const { toast } = useToast()

    const handleClick = () => {
        toast({
            title: "🚀 In development!",
            description: "This functionality is currently in development, check out later. 😊",
            className: "bg-blue-600 text-white",
        })
    }

    const buttonHardcode = [
        {
            id: 1,
            title: "New project"
        },
        {
            id: 2,
            title: "Frontend"
        },
        {
            id: 3,
            title: "Backend"
        },
        {
            id: 4,
            title: "Marketing"
        },
    ];

    return (
        <div className="flex flex-col">
            <div className="flex mt-16 justify-center items-center" onClick={() => handleClick()}>
                <Input
                    placeholder="Search any project you want to.."
                    className="bg-foreground text-background rounded-full outline-none focus-visible:outline-none border border-muted-foreground p-5 mx-2 max-w-[600px]"
                />
                <SearchIcon className="w-5 h-5 -translate-x-10 cursor-pointer text-background" />
            </div>
            <div className="flex flex-row flex-nowrap justify-center mt-2 gap-2">
                {buttonHardcode.map((button) => (
                    <Button
                        key={button.id}
                        variant="ghost"
                        className="w-fit my-2 h-8 rounded-full"
                        onClick={() => handleClick()}
                    >
                        {button.title}
                        <span className="ml-2">
                            <ArrowTopRightIcon />
                        </span>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default ExploreSearch;