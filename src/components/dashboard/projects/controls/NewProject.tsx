"use client";

import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { validateCreateProject } from "@/schema/projects";
import type { CreateProject } from "@/types/projects";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/components/ui/LoadingButton";
import { createProject } from "@/mutate/projects";
import { useToast } from "@/components/ui/use-toast";
import { mutate } from "swr";

export default function NewProject() {
  const [isOpenedDialog, setIsOpenedDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<CreateProject>({
    resolver: zodResolver(validateCreateProject),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onCreate(input: CreateProject) {
    try {
      setIsLoading(true);
      await createProject(input);
    } catch (e) {
      toast({
        title: "An error occurred",
        description: `${e}`,
        className: "text-red-600 text-lg",
      });
    } finally {
      setIsOpenedDialog(false);
      setIsLoading(false);
      form.reset();
    }
  }

  return (
    <Dialog open={isOpenedDialog} onOpenChange={setIsOpenedDialog}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center justify-between">
          <FilePlus />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Project</DialogTitle>
          <DialogDescription>Edit title and description for a new project.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onCreate)} className="space-y-8">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Title</FormLabel>
                <FormControl>
                  <Input className="w-full" placeholder="Your title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Description</FormLabel>
                <FormControl>
                  <Textarea className="w-full h-48 resize-none" placeholder="Your description..." {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                    This description is meant for humans, AI will not see this.
                </FormDescription>
                <FormItem />
              </FormItem>
            )} />
            <div className="flex justify-end w-full">
              <LoadingButton isLoading={isLoading}>Create</LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
