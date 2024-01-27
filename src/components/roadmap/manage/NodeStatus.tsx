import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import useNodeStore from "@/store/NodeStore";
import { useState } from "react";

type status = "learning" | "skipped" | "finished" | "default";
const statusButtons: status[] = ["default", "learning", "finished", "skipped"];

const statusColors: Record<status, string> = {
  learning: "bg-yellow-500",
  skipped: "bg-red-500",
  finished: "bg-green-500",
  default: "bg-slate-400",
};

const NodeStatus = () => {
  const { currentNode } = useNodeStore();
  const [status, setStatus] = useState<status>(currentNode?.data.status);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function handleStatus(status: status) {
    setStatus(status);
    setIsPopoverOpen(false)
    console.log("set " + status, currentNode);
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div className="cursor-pointer w-1/2 h-[50px] text-md inline-flex items-center justify-center hover:border-foreground/70 rounded-xl border border-foreground">
        <div className={`box h-3 w-3 rounded-full mr-2 ${statusColors[status]}`}>

        </div>
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
            className="h-[40px] w-full text-center flex flex-row justify-start"
            onClick={() => handleStatus(buttonStatus)}
          >
            <div className={`box h-3 w-3 rounded-full mr-2 ${statusColors[buttonStatus]}`}>

            </div>
            {buttonStatus.charAt(0).toUpperCase() + buttonStatus.slice(1)}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default NodeStatus;
