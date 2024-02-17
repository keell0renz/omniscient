"use client"
import LoadingButton from "@/components/ui/LoadingButton";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import {
    AlertDialogOverlay,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { importProject } from "@/mutate/projects";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

type ImportProjectProps = {
    project_id: string;
};

export const ImportProjectDialog: React.FC<ImportProjectProps> = ({ project_id }) => {
    const { toast } = useToast();
    const router = useRouter();
    const [isOpenedDialog, setIsOpenedDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function handleOverlayClick(event: any) {
        if (event.target?.getAttribute("id")?.includes("overlay")) {
            setIsOpenedDialog(false);
        }
    }

    async function handleImport() {
        try {
            setIsLoading(true);
            await importProject(project_id);
            router.push("/projects")
        } catch (e) {
            toast({
                title: "Failed to import project",
                description: `${e}`,
                className: "text-red-600 text-lg",
            })
            setIsLoading(false);
        }
    }

    return (
        <>
            <LoadingButton
                isLoading={isLoading}
                variant="default"
                onClick={() => setIsOpenedDialog(true)}
            >Learn</LoadingButton>
            <AlertDialog open={isOpenedDialog} onOpenChange={setIsOpenedDialog}>
                <AlertDialogOverlay onClick={(e) => handleOverlayClick(e)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will import public project.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <LoadingButton
                                onClick={() => handleImport()}
                                variant="default"
                                isLoading={isLoading}
                            >
                                Import
                            </LoadingButton>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}