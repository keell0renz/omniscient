import { ChevronDown, FilePlus } from "lucide-react";
import Link from "next/link";
import { DownloadCloud } from "lucide-react";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import NewProject from "./NewProject";

export default function NewPopover() {
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
          className="w-36 flex flex-col gap-1"
          sideOffset={10}
        >
          <Button variant={"ghost"} asChild>
            <Link
              href="/explore"
              className="flex flex-row justify-between items-center"
            >
              <DownloadCloud />
              Import
            </Link>
          </Button>
          <NewProject />
        </PopoverContent>
      </Popover>
    </>
  );
}
