"use client";
import { useForm } from "react-hook-form";
import { validateEditProject } from "@/schema/projects";
import type { EditProject } from "@/types/projects"
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
import { useState, useEffect } from "react";
import LoadingButton from "@/components/ui/LoadingButton";
import { editProject } from "@/mutate/projects";
import { useParams, useRouter } from "next/navigation";
import { useProject } from "@/hooks/projects";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditProject() {
    const [isLoading, setIsLoading] = useState(false);
    const { project_id } = useParams();
    const { data, isFetching } = useProject(project_id.toString());
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<EditProject>({
        resolver: zodResolver(validateEditProject),
    });

    // Set default values when data is available
    useEffect(() => {
        if (data) {
            form.reset({
                title: data.title,
                description: data.description,
            });
        }
    }, [data, form.reset]);

    async function onEdit(input: EditProject) {
        try {
            setIsLoading(true);
            await editProject(project_id.toString(), input);
            toast({
                title: "Project successfully saved",
                className: "text-lime-600 text-lg",
            });
            router.refresh();
        } catch (e) {
            toast({
                title: "Failed to edit project",
                description: `${e}`,
                className: "text-red-600 text-lg",
            });
        } finally {
            setIsLoading(false);
        }
    }

    if (isFetching) {
        return (
            <div className="w-full max-w-[600px] space-y-8">
                <div>
                    <Skeleton className="h-6 w-1/4 mb-2" />
                    <Skeleton className="h-10 w-full" />
                </div>

                <div>
                    <Skeleton className="h-6 w-1/4 mb-2" />
                    <Skeleton className="h-48 w-full" />
                </div>

                <div className="w-full flex flex-row justify-end">
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[600px]">
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
        </div>
    );
}