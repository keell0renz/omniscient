import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import CreateProject from "./CreateProject";

export default function AddProject() {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button className="flex flex-row justify-between items-center px-4 w-36 h-10">
            <p>New Project...</p>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-36 flex flex-col gap-1 p-2 rounded-xl"
          sideOffset={10}
        >
          <Button variant={"ghost"} asChild className="flex flex-row justify-start items-center">
            <Link
              href="/explore"
            >
              <Search className="h-5 w-5 mr-2" />
              Explore
            </Link>
          </Button>
          <CreateProject />
        </PopoverContent>
      </Popover>
    </>
  );
}
