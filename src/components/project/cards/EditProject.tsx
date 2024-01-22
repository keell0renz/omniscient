"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { CreateProjectSchema, validateCreateProject } from "@/schema/project";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editProject } from "@/server/project";
import { useState } from "react";
import LoadingButton from "@/components/ui/LoadingButton";
import { useContext } from "react";
import { PopoverContext } from "@/components/context/PopoverContext";

function EditProjectForm({
  setIsOpenedDialog,
}: {
  setIsOpenedDialog: (open: boolean) => void;
}) {
  const { project, setOpenPopover } = useContext(PopoverContext);
  const form = useForm<CreateProjectSchema>({
    resolver: zodResolver(validateCreateProject),
    defaultValues: {
      title: project.title ? project.title : "",
      description: project.description ? project.description : "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onEdit(input: CreateProjectSchema) {
    setIsLoading(true);
    await editProject(input, project.id);
    setIsLoading(false);
    setIsOpenedDialog(false);
    setOpenPopover?.(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onEdit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Title</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Your title..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  className="w-full h-48 resize-none"
                  placeholder="Your description..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="w-full flex flex-row justify-end">
          <LoadingButton className="w-full" isLoading={isLoading}>
            Save
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}

export default function EditProject() {
  const [openDialog, setIsOpenedDialog] = useState(false);
  return (
    <Dialog open={openDialog} onOpenChange={setIsOpenedDialog}>
      <DialogTrigger>
        <div className="p-2 hover:bg-secondary rounded-md text-start flex flex-row justify-start">
          <span className="mr-2">
            <Settings />
          </span>
          Settings
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Here you can edit title and description of the project. <br />
            Projects imported from this project{" "}
            <span className="text-red-700">will not</span> be edited.
          </DialogDescription>
        </DialogHeader>
        <EditProjectForm setIsOpenedDialog={setIsOpenedDialog} />
      </DialogContent>
    </Dialog>
  );
}
