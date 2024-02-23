"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EditProject, Project } from "@/types/projects";
import {
    getProjectById,
    editProjectById,
    deleteProjectById,
} from "@/server/projects";

interface useProjectOptions {
    toastOnError?: boolean;
    toastOnSuccess?: boolean;
    redirectAfterEditTo?: string | null;
    redirectAfterDeleteTo?: string | null;
    initialData?: Project;
}

const useProjectDefaultOptions = {
    toastOnError: true,
    toastOnSuccess: true,
    redirectAfterEditTo: null,
    redirectAfterDeleteTo: "/dashboard/projects",
} satisfies useProjectOptions;

export default function useProject(
    project_id?: string,
    options: useProjectOptions = useProjectDefaultOptions,
) {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    if (!params && !project_id)
        throw Error(
            "useProject(): I didn't receive any project id! Anta baka!",
        );

    const { data, error, isLoading } = useQuery({
        queryKey: ["project", project_id || params.id],
        queryFn: async () => getProjectById(project_id || params.id),
        enabled: !!project_id,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retryOnMount: false,
        initialData: options.initialData,
    });

    useEffect(() => {
        if (error && options.toastOnError) {
            toast({
                title: error.name,
                description: error.message,
                className: "bg-destructive text-destructive-foreground",
            });
        }
    }, [error, options.toastOnError]);

    const editProjectMutation = useMutation({
        mutationFn: async (schema: EditProject) =>
            editProjectById(schema, project_id || params.id),
        onSuccess: async (updatedProject) => {
            queryClient.setQueryData(
                ["project", updatedProject.id],
                updatedProject,
            );

            if (options.toastOnSuccess)
                toast({
                    title: "Success!",
                    description: "Changes to the project are saved.",
                    className: "border-green-600 border-2",
                });

            if (options.redirectAfterEditTo)
                router.push(options.redirectAfterEditTo);
        },
        onError: async (error) => {
            toast({
                title: error.name,
                description: error.message,
                className: "bg-destructive text-destructive-foreground",
            });
        },
    });

    const deleteProjectMutation = useMutation({
        mutationFn: async () => deleteProjectById(project_id || params.id),
        onSuccess: async () => {
            queryClient.removeQueries({
                queryKey: ["project", project_id || params.id],
                exact: true,
            });

            if (options.toastOnSuccess)
                toast({
                    title: "Success!",
                    description: "Project has beed deleted.",
                    className: "border-destructive border-2",
                });

            if (options.redirectAfterDeleteTo)
                router.push(options.redirectAfterDeleteTo);
        },
        onError: async (error) => {
            toast({
                title: error.name,
                description: error.message,
                className: "bg-destructive text-destructive-foreground",
            });
        },
    });

    return {
        data,
        error,
        isLoading,
        isMutating:
            editProjectMutation.isPending || deleteProjectMutation.isPending,
        editProject: editProjectMutation.mutate,
        deleteProject: deleteProjectMutation.mutate,
    };
}
