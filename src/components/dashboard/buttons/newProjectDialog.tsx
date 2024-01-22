"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { createProject } from "@/server/project";
import { useState } from "react";
import LoadingButton from "@/components/ui/LoadingButton";
import { useContext } from "react";
import { PopoverContext } from "@/components/context/PopoverContext";
import { FilePlus } from "lucide-react";

function CreateProjectForm({
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

  async function onCreate(input: CreateProjectSchema) {
    setIsLoading(true);
    await createProject(input)
    setIsOpenedDialog(false);
    setOpenPopover?.(false);
    setIsLoading(false);
  }

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onCreate)} className="space-y-8">
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
            Create
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}

export default function AddNewProjectDialog() {
  const [openDialog, setIsOpenedDialog] = useState(false);
  return (
    <Dialog open={openDialog} onOpenChange={setIsOpenedDialog}>
      <DialogTrigger>
        <div className="w-full h-10 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 inline-flex items-center gap-2 hover:bg-accent hover:text-accent-foreground">
          <FilePlus />
          Create
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Project</DialogTitle>
          <DialogDescription>
            Here you can edit title and description for a new project.
          </DialogDescription>
        </DialogHeader>
        <CreateProjectForm setIsOpenedDialog={setIsOpenedDialog} />
      </DialogContent>
    </Dialog>
  );
}
