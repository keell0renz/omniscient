"use client"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
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
import { useParams } from "next/navigation";
import { useProject } from "@/hooks/projects";
import { Skeleton } from "@/components/ui/skeleton";

const ShareDialog = () => {
    const params = useParams<{ id: string }>();
    const { editProject, data } = useProject(params.id);

    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isSharing, setIsSharing] = useState(false);

    function handleOverlayClick(event: any) {
        if (event.target?.getAttribute("id")?.includes("overlay")) {
            setIsOpenDialog(false);
        }
    }

    async function onShare() {
        try {
            setIsSharing(true);
            await editProject({ public: !data?.public });
        } finally {
            setIsOpenDialog(false);
            setIsSharing(false);
        }
    }

    return (
        <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
            <AlertDialogTrigger asChild>
                <Button variant="default">
                    {data?.public
                        ? "Unpublish"
                        : "Publish"
                    }
                </Button>
            </AlertDialogTrigger>
            <AlertDialogOverlay onClick={(e) => handleOverlayClick(e)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will make your project publicly
                            {data?.public
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
                            isLoading={isSharing}
                        >
                            {data?.public
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

export default function ShareSettings() {
    const params = useParams<{ id: string }>();
    const { isFetching, data } = useProject(params.id);

    return (
        <Card className="flex flex-col justify-between items-center w-full max-w-[800px]">
            <CardHeader className="w-full">
                <CardTitle className="text-start text-2xl">Project Publicity</CardTitle>
            </CardHeader>
            <CardFooter className="px-4 py-2 flex flex-row justify-between border-t w-full">
                {isFetching
                    ? (
                        <>
                            <Skeleton className="w-44 h-5" />
                            <Skeleton className="h-9 w-24" />
                        </>
                    ) : (
                        <>
                            <p className="mx-2 text-sm text-muted-foreground">
                                Make project publicly {data?.public ? "unavailable" : "available"}
                            </p>
                            <ShareDialog />
                        </>
                    )
                }
            </CardFooter>
        </Card>
    );
}