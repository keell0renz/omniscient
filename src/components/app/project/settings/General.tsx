"use client";
import { useForm } from "react-hook-form";
import { validateEditProject } from "@/schema/projects";
import type { EditProject } from "@/types/projects";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/ui/LoadingButton";
import { useParams } from "next/navigation";
import { useProject } from "@/hooks/projects";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { SquarePen } from "lucide-react";
import { useEffect } from "react";

function GeneralForm() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isMutating, editProject } = useProject(params.id);

  const form = useForm<EditProject>({
    resolver: zodResolver(validateEditProject),
    defaultValues: {
      title: data?.title,
      description: data?.description,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        description: data.description,
      });
    }
  }, [data, form.reset]);

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => editProject(data))}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Title</FormLabel>
                {isLoading ? (
                  <Skeleton className="w-full h-10" />
                ) : (
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Your title..."
                      {...field}
                    />
                  </FormControl>
                )}
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
                {isLoading ? (
                  <Skeleton className="w-full h-48" />
                ) : (
                  <FormControl>
                    <Textarea
                      className="w-full h-48 resize-none"
                      placeholder="Your description..."
                      {...field}
                    />
                  </FormControl>
                )}
                <FormMessage />
                <FormDescription>
                  This description is meant for humans, AI will not see this.
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="w-full flex flex-row justify-end">
            <LoadingButton
              className="w-full"
              isLoading={isMutating}
              disabled={isLoading}
            >
              Save
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default function General() {
  return (
    <Card className="max-w-[600px]">
      <CardHeader className="flex flex-row justify-start items-center text-xl font-semibold gap-2">
        <SquarePen />
        Edit Project
      </CardHeader>
      <CardContent>
        <GeneralForm />
      </CardContent>
    </Card>
  );
}
