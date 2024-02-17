"use client"
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { DownloadCloud } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import {
    PopoverTrigger,
    Popover,
    PopoverContent,
} from "@/components/ui/popover";
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

export default function ProjectsAddNew() {
    const [isOpenedDialog, setIsOpenedDialog] = useState(false);
    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <div className="w-36 h-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black border border-input">
                        Add New
                        <span className="ml-2">
                            <ChevronDown className="h-4 w-4" />
                        </span>
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    align="end"
                    className="w-36 flex flex-col gap-1"
                    sideOffset={10}
                >
                    <Link
                        href="/explore"
                        className="h-10 justify-center whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 inline-flex items-center gap-2 hover:bg-accent hover:text-accent-foreground"
                    >
                        <DownloadCloud className="w-6 h-6" />
                        Import
                    </Link>
                    <p
                        className="h-10 justify-center whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 inline-flex items-center gap-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                        onClick={() => setIsOpenedDialog(true)}
                    >
                        <PlusCircledIcon className="w-6 h-6" />
                        Create
                    </p>
                </PopoverContent>
            </Popover >
            <AddNewDialog isOpenedDialog={isOpenedDialog} setIsOpenedDialog={setIsOpenedDialog} />
        </>
    );
}
type AddNewDialogProps = {
    isOpenedDialog: boolean;
    setIsOpenedDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddNewDialog: React.FC<AddNewDialogProps> = ({ isOpenedDialog, setIsOpenedDialog }) => {
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
            createProject(input)
            toast({
                title: "Project successfully created",
                className: "text-lime-500 text-lg"
            })
        } catch (e) {
            toast({
                title: "An error occurred",
                description: `${e}`,
                className: "text-red-600 text-lg",
            })
        } finally {
            setIsOpenedDialog(false);
            setIsLoading(false);
            form.reset()
        }
    }

    const [isLoading, setIsLoading] = useState(false);

    return (
        <Dialog open={isOpenedDialog} onOpenChange={setIsOpenedDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new Project</DialogTitle>
                    <DialogDescription>
                        Here you can edit title and description for a new project.
                    </DialogDescription>
                </DialogHeader>
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
            </DialogContent>
        </Dialog >
    );
};