"use client";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Trash2 } from "lucide-react";

function DeleteProjectDialog() {
  const params = useParams<{ id: string }>();

  const { deleteProject, isLoading, isMutating } = useProject(params.id);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  async function handleDelete() {
    await deleteProject();
  }

  function handleOverlayClick(event: any) {
    if (event.target?.getAttribute("id")?.includes("overlay")) {
      setIsOpenDialog(false);
    }
  }
  return (
    <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={isLoading}>
          Delete
        </Button>
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
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              isLoading={isMutating}
              disabled={isLoading}
            >
              Delete
            </LoadingButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default function DangerSettings() {
  return (
    <Card className="flex flex-col justify-between items-center w-full max-w-[800px]">
      <CardHeader className="w-full">
        <CardTitle className="flex flex-row justify-start items-center text-xl font-semibold gap-2">
          <Trash2 />
          Delete Project
        </CardTitle>
      </CardHeader>
      <CardFooter className="px-4 py-2 flex flex-row justify-between border-t w-full">
        <p className="mx-2 text-sm text-muted-foreground">
          This will permanently delete your project
        </p>
        <DeleteProjectDialog />
      </CardFooter>
    </Card>
  );
}
