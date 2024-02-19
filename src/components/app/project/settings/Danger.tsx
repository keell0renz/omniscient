"use client"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    AlertDialogOverlay,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import LoadingButton from "@/components/ui/LoadingButton";
import { useParams } from "next/navigation";
import { useProject } from "@/hooks/projects";
import { useState } from "react";

const DeleteProjectDialog = () => {
    const params = useParams<{ id: string }>();

    const { deleteProject } = useProject(params.id);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        try {
            setIsDeleting(true);
            // await deleteProject();
            console.log('delete project:', params.id)
        } finally {
            setIsDeleting(false);
            setIsOpenDialog(false);
        }
    }

    function handleOverlayClick(event: any) {
        if (event.target?.getAttribute("id")?.includes("overlay")) {
            setIsOpenDialog(false);
        }
    }
    return (
        <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogOverlay onClick={handleOverlayClick}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            project.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <LoadingButton
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-800 text-foreground font-bold"
                            isLoading={isDeleting}
                        >
                            Delete
                        </LoadingButton>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default function DangerSettings() {
    return (
        <Card className="flex flex-col justify-between items-center w-full max-w-[800px]">
            <CardHeader className="w-full">
                <CardTitle className="text-start text-2xl">Delete Project</CardTitle>
                <CardDescription>This action is permanent and cannot be undone.</CardDescription>
            </CardHeader>
            <CardFooter className="px-4 py-2 flex flex-row justify-between border-t w-full">
                <p className="mx-2 text-sm text-muted-foreground">This will permanently delete your project</p>
                <DeleteProjectDialog />
            </CardFooter>
        </Card>
    );
}