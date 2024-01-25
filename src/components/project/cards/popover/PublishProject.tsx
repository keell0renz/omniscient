"use client";
import { setProjectPublicity } from "@/server/project";
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
import { BookX, BookCheck } from "lucide-react";
import { useState } from "react";
import { useContext } from "react";
import { PopoverContext } from "@/components/project/cards/popover/context/PopoverContext";
import LoadingButton from "@/components/ui/LoadingButton";

export default function DeleteProject() {
  const { project, setOpenPopover } = useContext(PopoverContext);
  const [isOpenedDialog, setIsOpenedDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleOverlayClick(event: any) {
    if (event.target?.getAttribute("class")?.includes("bg-black/80")) {
      setIsOpenedDialog(false);
    }
  }

  async function onPublish() {
    setIsLoading(true);
    await setProjectPublicity(!project.public, project.id);
    setIsOpenedDialog(false);
    setOpenPopover?.(false);
    setIsLoading(false);
  }

  return (
    <AlertDialog open={isOpenedDialog} onOpenChange={setIsOpenedDialog}>
      <AlertDialogTrigger asChild className="cursor-pointer">
        <div className="p-2 hover:bg-secondary rounded-md text-start flex flex-row justify-start">
          {project.public ? (
            <>
              <span className="mr-2">
                <BookX />
              </span>
              Unpublish
            </>
          ) : (
            <>
              <span className="mr-2">
                <BookCheck />
              </span>
              Publish
            </>
          )}
        </div>
      </AlertDialogTrigger>
      <AlertDialogOverlay onClick={(e) => handleOverlayClick(e)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This project will be {project.public && "un"}published.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <LoadingButton
              onClick={() => onPublish()}
              className="bg-blue-600 hover:bg-blue-800 text-foreground font-bold"
              isLoading={isLoading}
            >
              {!project.public ? "Publish" : "Unpublish"}
            </LoadingButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
