"use client"
import LoadingButton from "@/components/ui/LoadingButton";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";


const ChatPopover = ({ chat_id }: { chat_id: string }) => {
    const [isOpenedDialog, setIsOpenedDialog] = useState(false);
    const [isOpenedPopover, setIsOpenedPopover] = useState(false);
    const [isLoading] = useState(false);

    function handleOverlayClick(event: any) {
        if (event.target?.getAttribute("class")?.includes("bg-black/80")) {
            setIsOpenedDialog(false);
        }
    }

    function onDelete() {
        console.log('delete chat:', chat_id);

        setIsOpenedDialog(false);
        setIsOpenedPopover(false);
    }
    return (
        <Popover open={isOpenedPopover} onOpenChange={setIsOpenedPopover}>
            <PopoverTrigger>
                <MoreHorizontal className="opacity-0 group-hover:opacity-100 w-6" />
            </PopoverTrigger>
            <PopoverContent
                className="w-36 flex flex-col gap-1 px-2"
            >
                <AlertDialog open={isOpenedDialog} onOpenChange={setIsOpenedDialog}>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="destructive"
                            className="w-full"
                        >Delete</Button>
                    </AlertDialogTrigger>
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
            </PopoverContent>
        </Popover>
    );
};

export default ChatPopover;