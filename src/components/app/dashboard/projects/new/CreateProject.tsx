"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import type { CreateProject } from "@/types/projects";
import { useNewProject } from "@/hooks/projects";
import CreateProjectForm from "./CreateProjectForm";
import { Sparkles } from "lucide-react";

export default function CreateProject() {
  const [isOpenedDialog, setIsOpenedDialog] = useState(false);
  const { createProject, isMutating } = useNewProject();

  async function onCreate(input: CreateProject) {
    await createProject(input);
    // setIsOpenedDialog(false);
  }

  return (
    <Dialog open={isOpenedDialog} onOpenChange={setIsOpenedDialog}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex flex-row justify-start items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-row justify-start items-center text-2xl">
            <Sparkles className="mr-1" />
            <h1>Create Project</h1>
          </DialogTitle>
          <DialogDescription>
            Create a self-learning project, your personal learning environment!
          </DialogDescription>
        </DialogHeader>
        <CreateProjectForm onCreate={onCreate} isMutating={isMutating} />
      </DialogContent>
    </Dialog>
  );
}
