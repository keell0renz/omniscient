"use client";
import { useForm } from "react-hook-form";
import { validateSetNodeAIContext } from "@/schema/AiContext"
import type { NodeAIContext } from "@/types/AiContext";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import LoadingButton from "@/components/ui/LoadingButton";
import { editProject } from "@/mutate/projects";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useProject } from "@/hooks/projects";
import { Skeleton } from "@/components/ui/skeleton";

export default function SetContextProject() {
    const { project_id } = useParams();
    const { toast } = useToast();
    const { data, isFetching } = useProject(project_id.toString());

    const form = useForm<NodeAIContext>({
        resolver: zodResolver(validateSetNodeAIContext),
        defaultValues: {
            ai_context: data?.ai_context || "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (data?.ai_context) {
            form.reset({
                ai_context: data.ai_context,
            });
        }
    }, [data, form.reset]);

    async function onSetAIContext(input: NodeAIContext) {
        try {
            setIsLoading(true);
            await editProject(project_id.toString(), input);
            toast({
                title: "Context successfully set",
                className: "text-lime-600 text-lg",
            });
            setIsLoading(false);
        } catch (e) {
            toast({
                title: "Failed to set context",
                description: `${e}`,
                className: "text-red-600 text-lg",
            });
            setIsLoading(false);
        }
    }

    if (isFetching) {
        return (
            <div className="space-y-4">
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-44" />
                <Skeleton className="w-full h-10" />
            </div>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSetAIContext)}>
                <FormField
                    control={form.control}
                    name="ai_context"
                    render={({ field }) => (
                        <FormItem className="space-y-4">
                            <FormLabel className="text-3xl font-semibold">
                                AI Context
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    className="w-full h-48 resize-none border-primary-foreground"
                                    placeholder="Your AI context..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-md" />
                        </FormItem>
                    )}
                />
                <div className="w-full flex flex-row justify-end mt-6">
                    <LoadingButton className="w-full" isLoading={isLoading}>
                        Set Context
                    </LoadingButton>
                </div>
            </form>
        </Form>
    );
}
