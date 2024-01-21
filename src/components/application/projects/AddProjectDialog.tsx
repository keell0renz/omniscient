"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FilePlus } from "lucide-react";
import CreateProjectForm from "./CreateProjectForm";

export default function AddProjectDialog() {
    const [openDialog, setIsOpenedDialog] = useState(false);
    return (
        <Dialog open={openDialog} onOpenChange={setIsOpenedDialog}>
            <DialogTrigger>
                <div className="w-full h-10 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 inline-flex items-center gap-2 hover:bg-accent hover:text-accent-foreground">
                    <FilePlus />
                    Create
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new Project</DialogTitle>
                    <DialogDescription>
                        Here you can edit title and description for a new project.
                    </DialogDescription>
                </DialogHeader>
                <CreateProjectForm setIsOpenedDialog={setIsOpenedDialog} />
            </DialogContent>
        </Dialog>
    );
}