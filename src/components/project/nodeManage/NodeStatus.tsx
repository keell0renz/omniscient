import { Button } from "@/components/ui/button";
import {
    PopoverTrigger,
    Popover,
    PopoverContent,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import useNodeStore from "@/store/NodeStore";
import { useState } from "react";

type status = "learning" | "skipped" | "finished" | "unknown";
const statusButtons: status[] = ["skipped", "learning", "finished", "unknown"];

const statusColors: Record<status, string> = {
    "learning": "#FF8C00",  // Dark Orange
    "skipped": "#E74C3C",   // Alizarin Red
    "finished": "#2ECC71",  // Emerald Green
    "unknown": "#A9A9A9",   // Dark Gray
};


const NodeStatus = () => {
    const { currentNode } = useNodeStore();
    const [status, setStatus] = useState<status | null>(currentNode?.data.status);

    function handleStatus(status: status) {
        setStatus(status);
        console.log("set " + status, currentNode)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="cursor-pointer w-1/2 h-[50px] text-xl inline-flex items-center justify-center hover:border-foreground/70 rounded-md border border-foreground">
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="14" r="5" fill={statusColors[status || "unknown"]} />
                    </svg>
                    {status!.charAt(0).toUpperCase() + status!.slice(1)}
                    <span className="ml-2">
                        <ChevronDown className="h-4 w-4" />
                    </span>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-36 flex flex-col gap-1" sideOffset={10}>
                {statusButtons.map((buttonStatus) => (
                    <Button
                        key={buttonStatus}
                        variant="ghost"
                        className="h-[30px] w-full text-center"
                        onClick={() => handleStatus(buttonStatus)}
                    >
                        {buttonStatus.charAt(0).toUpperCase() + buttonStatus.slice(1)}
                    </Button>
                ))}
            </PopoverContent>
        </Popover>
    );
};

export default NodeStatus;
