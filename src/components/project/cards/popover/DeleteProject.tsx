"use client";
import { deleteProjectById } from "@/server/project";
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
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useContext } from "react";
import { PopoverContext } from "@/components/project/cards/popover/context/PopoverContext";
import LoadingButton from "@/components/ui/LoadingButton";

export default function DeleteProject() {
  const { project, setOpenPopover } = useContext(PopoverContext);
  const [isOpenedDialog, setIsOpenedDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleOverlayClick(event: any) {
    if (
      event.target?.getAttribute('class')?.includes('bg-black/80')
    ) {
      setIsOpenedDialog(false);
    }
  }

  async function onDelete() {
    setIsLoading(true);
    await deleteProjectById(project.id);
    setIsOpenedDialog(false);
    setOpenPopover?.(false);
    setIsLoading(false);
  }

  return (
    <AlertDialog open={isOpenedDialog} onOpenChange={setIsOpenedDialog}>
      <AlertDialogTrigger asChild className="cursor-pointer">
        <div className="p-2 hover:bg-secondary rounded-md text-start flex flex-row justify-start">
          <span className="mr-2">
            <Trash2 />
          </span>
          Delete
        </div>
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
  );
}
