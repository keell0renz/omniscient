"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { validateCreateProject } from "@/schema/projects";
import type { CreateProject } from "@/types/projects";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/components/ui/LoadingButton";

interface CreateProjectFormProps {
  onCreate: (input: CreateProject) => Promise<void>;
  isMutating: boolean;
}

export default function CreateProjectForm({
  onCreate,
  isMutating,
}: CreateProjectFormProps) {
  const form = useForm<CreateProject>({
    resolver: zodResolver(validateCreateProject),
    defaultValues: {
      title: "",
      description: "",
    },
  });

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
              <FormMessage />
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
              <FormMessage />
              <FormDescription>
                This description is meant for humans, AI will not see this.
              </FormDescription>
              <FormItem />
            </FormItem>
          )}
        />
        <div className="flex justify-end w-full">
          <LoadingButton isLoading={isMutating}>Create</LoadingButton>
        </div>
      </form>
    </Form>
  );
}
