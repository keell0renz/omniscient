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
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/ui/LoadingButton";
import { useParams } from "next/navigation";
import { useProject } from "@/hooks/projects";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useEffect } from "react";

function ContextForm() {
  const params = useParams<{ id: string }>();
  const { editProject, isLoading, isMutating, data } = useProject(params.id);

  const form = useForm<EditProject>({
    resolver: zodResolver(validateEditProject),
    defaultValues: {
      ai_context: data?.ai_context || "",
    },
  });

  useEffect(() => {
    if (data?.ai_context) {
      form.reset({
        ai_context: data.ai_context,
      });
    }
  }, [data, form.reset]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(editProject)}>
        <FormField
          control={form.control}
          name="ai_context"
          render={({ field }) => (
            <FormItem className="space-y-4">
              {isLoading ? (
                <Skeleton className="w-full h-48" />
              ) : (
                <FormControl>
                  <Textarea
                    className="w-full h-48 resize-none border-primary-foreground"
                    placeholder="Your AI context..."
                    {...field}
                  />
                </FormControl>
              )}
              <FormMessage />
              <FormDescription>
                They will be injected in each conversation with AI chatbot.
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="w-full flex flex-row justify-end mt-6">
          <LoadingButton className="w-full" isLoading={isMutating} disabled={isLoading}>
            Set
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}

export default function ContextSettings() {
  return (
    <Card className="max-w-[600px]">
      <CardHeader className="flex flex-row justify-start items-center text-xl font-semibold gap-2">
        <Sparkles />
        AI Instructions
      </CardHeader>
      <CardContent>
        <ContextForm />
      </CardContent>
    </Card>
  );
}
