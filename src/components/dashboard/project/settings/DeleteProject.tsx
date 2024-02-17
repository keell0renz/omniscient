"use client"
import { AlertDialog } from "@/components/ui/alert-dialog";
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
import { useState } from "react";
import LoadingButton from "@/components/ui/LoadingButton";
import { useParams, useRouter } from "next/navigation";
import { deleteProject } from "@/mutate/projects";
import { useToast } from "@/components/ui/use-toast";

export default function DeleteProject() {
    const [isOpenedDialog, setIsOpenedDialog] = useState(false);
    return (
        <>
            <Card className="flex flex-col justify-between items-center w-full">
                <CardHeader className="w-full">
                    <CardTitle className="text-start text-2xl">Delete Project</CardTitle>
                    <CardDescription>This action is permanent and cannot be undone.</CardDescription>
                </CardHeader>
                <CardFooter className="px-4 py-2 flex flex-row justify-between border-t w-full">
                    <p className="mx-2 text-sm text-muted-foreground">This will permanently delete your project</p>
                    <Button variant="destructive" onClick={() => setIsOpenedDialog(true)}>Delete</Button>
                </CardFooter>
            </Card>
            <DeleteProjectDialog isOpenedDialog={isOpenedDialog} setIsOpenedDialog={setIsOpenedDialog} />
        </>
    );
}

type DeleteProjectDialogProps = {
    isOpenedDialog: boolean;
    setIsOpenedDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteProjectDialog: React.FC<DeleteProjectDialogProps> = ({ isOpenedDialog, setIsOpenedDialog }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { project_id } = useParams();
    const { toast } = useToast();
    const router = useRouter();

    function handleOverlayClick(event: any) {
        if (event.target?.getAttribute("id")?.includes("overlay")) {
            setIsOpenedDialog(false);
        }
    }

    async function onDelete() {
        try {
            setIsLoading(true);
            await deleteProject(project_id.toString());
            router.push("/projects")
        } catch (e) {
            toast({
                title: "Failed to delete project",
                description: `${e}`,
                className: "text-red-600 text-lg",
            })
            setIsLoading(false);
        }
    }

    return (
        <AlertDialog open={isOpenedDialog} onOpenChange={setIsOpenedDialog}>
            <AlertDialogOverlay onClick={(e) => handleOverlayClick(e)}>
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
                            onClick={() => onDelete()}
                            className="bg-red-500 hover:bg-red-800 text-foreground font-bold"
                            isLoading={isLoading}
                        >
                            Delete
                        </LoadingButton>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}