"use client";
import { useForm } from "react-hook-form";
import { validateCreateProject, CreateProjectSchema } from "@/schema/project";
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
import LoadingButton from "@/components/application/LoadingButton";

export default function CreateProjectForm({
    setIsOpenedDialog,
}: {
    setIsOpenedDialog: (open: boolean) => void;
}) {
    const form = useForm<CreateProjectSchema>({
        resolver: zodResolver(validateCreateProject),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    async function onCreate(input: CreateProjectSchema) {
        setIsLoading(true);
        await createProject(input);
        setIsOpenedDialog(false);
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
                                    className="w-full border"
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
                    <LoadingButton isLoading={isLoading}>
                        Create
                    </LoadingButton>
                </div>
            </form>
        </Form>
    );
};