import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { DownloadCloud } from "lucide-react";
import {
    PopoverTrigger,
    Popover,
    PopoverContent,
} from "@/components/ui/popover";
import AddNewProjectDialog from "@/components/application/projects/AddProjectDialog";
import { Button } from "@/components/ui/button";

export default function NewProject() {
    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="w-36 h-full" variant="default">
                        New Project...
                        <span className="ml-2">
                            <ChevronDown className="h-4 w-4" />
                        </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align="end"
                    className="w-36 flex flex-col gap-1"
                    sideOffset={10}
                >
                    <Link
                        href="/explore"
                        className="h-10 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 inline-flex items-center gap-2 hover:bg-accent hover:text-accent-foreground"
                    >
                        <DownloadCloud />
                        Import
                    </Link>
                    <AddNewProjectDialog />
                </PopoverContent>
            </Popover>
        </>
    );
}
