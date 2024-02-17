"use client"
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { editProject } from "@/mutate/projects";
import { useProject } from "@/hooks/projects";
import type { Project } from "@/types/projects";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShareProject() {
    const { project_id } = useParams();
    const [isOpenedDialog, setIsOpenedDialog] = useState(false);
    const { data, isFetching } = useProject(project_id.toString())

    if (isFetching) return (
        <Card className="flex flex-col justify-between items-center w-full">
            <CardHeader className="w-full">
                <Skeleton className="h-8 w-44" />
            </CardHeader>
            <CardFooter className="px-4 py-2 flex flex-row justify-between border-t w-full">
                <Skeleton className="w-44 h-5" />
                <Skeleton className="h-9 w-24" />
            </CardFooter>
        </Card>
    );

    return (
        <>
            <Card className="flex flex-col justify-between items-center w-full">
                <CardHeader className="w-full">
                    <CardTitle className="text-start text-2xl">Project Publicity</CardTitle>
                </CardHeader>
                <CardFooter className="px-4 py-2 flex flex-row justify-between border-t w-full">
                    <p className="mx-2 text-sm text-muted-foreground">
                        Make project publicly {data?.public ? "unavailable" : "available"}
                    </p>
                    <Button variant="default" onClick={() => setIsOpenedDialog(true)}>
                        {data?.public
                            ? "Unpublish"
                            : "Publish"
                        }
                    </Button>
                </CardFooter>
            </Card>
            <ShareProjectDialog isOpenedDialog={isOpenedDialog} setIsOpenedDialog={setIsOpenedDialog} project={data} />
        </>
    );
}

type ShareProjectDialogProps = {
    isOpenedDialog: boolean;
    setIsOpenedDialog: React.Dispatch<React.SetStateAction<boolean>>;
    project: Project | null | undefined;
};

const ShareProjectDialog: React.FC<ShareProjectDialogProps> = ({ isOpenedDialog, setIsOpenedDialog, project }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { project_id } = useParams();
    const { toast } = useToast();
    const router = useRouter();

    function handleOverlayClick(event: any) {
        if (event.target?.getAttribute("id")?.includes("overlay")) {
            setIsOpenedDialog(false);
        }
    }

    async function onShare() {
        try {
            setIsLoading(true);
            await editProject(project_id.toString(), {
                public: !project!.public,
            });
            toast({
                title: "Project publicity successfully setted",
                className: "text-lime-600 text-lg",
            })
            setIsOpenedDialog(false);
            router.refresh()
        } catch (e) {
            toast({
                title: "Failed to share project",
                description: `${e}`,
                className: "text-red-600 text-lg",
            })
        } finally {
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
                            This will make your project publicly
                            {project!.public
                                ? " unavailable"
                                : " available"
                            }.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <LoadingButton
                            onClick={() => onShare()}
                            className="bg-primary font-bold"
                            isLoading={isLoading}
                        >
                            {project!.public
                                ? "Unpublish"
                                : "Publish"
                            }
                        </LoadingButton>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}