"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { BotIcon, Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { CreateProjectSchema, SetAIContextSchema, validateCreateProject, validateSetAIContext } from "@/schema/project"
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
import { editProject, setAIContextForProject } from "@/server/project";
import {
    PopoverTrigger,
    Popover,
    PopoverContent,
} from "@/components/ui/popover";
import { Brain } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Project } from "@prisma/client";
import { useState } from "react";
import { PopoverContext } from "@/context/PopoverContext";
import { setProjectPublicity } from "@/server/project";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BookX, BookCheck } from "lucide-react";
import { useContext } from "react";
import LoadingButton from "@/components/application/LoadingButton";
import { Trash2 } from "lucide-react";
import { deleteProjectById } from "@/server/project";

function PublishProject() {
    const { project, setOpenPopover } = useContext(PopoverContext);
    const [isOpenedDialog, setIsOpenedDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function onPublish() {
        setIsLoading(true);
        await setProjectPublicity(!project.public, project.id);
        setIsOpenedDialog(false);
        setOpenPopover?.(false);
        setIsLoading(false);
    }

    return (
        <AlertDialog open={isOpenedDialog} onOpenChange={setIsOpenedDialog}>
            <AlertDialogTrigger asChild className="cursor-pointer">
                <div className="p-2 hover:bg-secondary rounded-md text-start flex flex-row justify-start">
                    {project.public ? (
                        <>
                            <span className="mr-2">
                                <BookX />
                            </span>
                            Unpublish
                        </>
                    ) : (
                        <>
                            <span className="mr-2">
                                <BookCheck />
                            </span>
                            Publish
                        </>
                    )}
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This project will be {project.public && "un"}published.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <LoadingButton
                        onClick={() => onPublish()}
                        className="bg-blue-600 hover:bg-blue-800 text-foreground font-bold"
                        isLoading={isLoading}
                    >
                        {!project.public ? "Publish" : "Unpublish"}
                    </LoadingButton>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

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

function EditProject() {
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

function EditAiContextForm({
    setIsOpenedDialog,
}: {
    setIsOpenedDialog: (open: boolean) => void;
}) {
    const { project, setOpenPopover } = useContext(PopoverContext);
    const form = useForm<SetAIContextSchema>({
        resolver: zodResolver(validateSetAIContext),
        defaultValues: {
            ai_context: project.ai_context ? project.ai_context : "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    async function onEdit(input: SetAIContextSchema) {
        setIsLoading(true);
        await setAIContextForProject(input, project.id);
        setIsLoading(false);
        setIsOpenedDialog(false);
        setOpenPopover?.(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onEdit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="ai_context"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg font-semibold">AI Context</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="w-full"
                                    placeholder="Your context..."
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

function EditAiContext() {
    const [openDialog, setIsOpenedDialog] = useState(false);
    return (
        <Dialog open={openDialog} onOpenChange={setIsOpenedDialog}>
            <DialogTrigger>
                <div className="p-2 hover:bg-secondary rounded-md text-start flex flex-row justify-start">
                    <span className="mr-2">
                        <BotIcon />
                    </span>
                    AI Context
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">Add Context</DialogTitle>
                    <DialogDescription className="text-md">
                        Here you can set context which will be injected <br />
                        directly into chats of the learning project. Be concise!
                    </DialogDescription>
                </DialogHeader>
                <EditAiContextForm setIsOpenedDialog={setIsOpenedDialog} />
            </DialogContent>
        </Dialog>
    );
}

function DeleteProject() {
    const { project, setOpenPopover } = useContext(PopoverContext);
    const [isOpenedDialog, setIsOpenedDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function onDelete() {
        setIsLoading(true);
        await deleteProjectById(project.id);
        setIsOpenedDialog(false);
        setOpenPopover?.(false);
        setIsLoading(false);
    }

    return (
        <AlertDialog open={isOpenedDialog} onOpenChange={setIsOpenedDialog}>
            <AlertDialogTrigger asChild className="cursor-pointer">
                <div className="p-2 hover:bg-secondary rounded-md text-start flex flex-row justify-start">
                    <span className="mr-2">
                        <Trash2 />
                    </span>
                    Delete
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        project.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <LoadingButton
                        onClick={() => onDelete()}
                        className="bg-red-500 hover:bg-red-800 text-foreground font-bold"
                        isLoading={isLoading}
                    >
                        Delete
                    </LoadingButton>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default function CardPopover({ project }: { project: Project }) {
    const [openPopover, setOpenPopover] = useState(false);

    return (
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger>
                <MoreHorizontal />
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="w-40 flex flex-col justify-start space-y-2"
                side="bottom"
            >
                <PopoverContext.Provider value={{ setOpenPopover, project }}>
                    <PublishProject />
                    <EditProject />
                    <EditAiContext />
                    <DeleteProject />
                </PopoverContext.Provider>
            </PopoverContent>
        </Popover>
    );
}