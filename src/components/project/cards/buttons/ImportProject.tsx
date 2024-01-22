"use client";

import { Project } from "@prisma/client";
import { importPublicProject } from "@/server/project";
import LoadingButton from "@/components/ui/LoadingButton";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function ImportProject({ project }: { project: Project }) {
  const [isOpenedDialog, setIsOpenedDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();

  async function handleImport() {
    setIsLoading(true);
    await importPublicProject(project.id);
    setIsOpenedDialog(false);
    setIsLoading(false);
  }

  if (!user) return;

  return (
    <AlertDialog open={isOpenedDialog} onOpenChange={setIsOpenedDialog}>
      <AlertDialogTrigger asChild>
        <LoadingButton
          variant="default"
          onClick={() => setIsOpenedDialog(true)}
          isLoading={isLoading}
        >
          Import
        </LoadingButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Import Project</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to import this project?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <button onClick={() => setIsOpenedDialog(false)}>Cancel</button>
          </AlertDialogCancel>
          <LoadingButton
            onClick={handleImport}
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold"
            isLoading={isLoading}
          >
            Import
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
