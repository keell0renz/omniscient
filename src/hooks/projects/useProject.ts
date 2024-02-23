"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EditProject } from "@/types/projects";
import {
    getProjectById,
    editProjectById,
    deleteProjectById,
} from "@/server/projects";

interface useProjectOptions {
    throwNotFoundOnNull?: boolean;
    toastOnError?: boolean;
    toastOnSuccess?: boolean;
    redirectAfterEditTo?: string | null;
    redirectAfterDeleteTo?: string | null;
}

const useProjectDefaultOptions = {
    throwNotFoundOnNull: true,
    toastOnError: true,
    toastOnSuccess: true,
    redirectAfterEditTo: null,
    redirectAfterDeleteTo: "/dashboard/projects",
} satisfies useProjectOptions;

export default function useProject(
    project_id: string | undefined,
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

    useEffect(() => {
        if (data === null) {
            if (options.throwNotFoundOnNull) {
                notFound();
            } else if (options.toastOnError) {
                toast({
                    title: "Project not found!",
                    description: "The requested project could not be found.",
                    className: "bg-destructive text-destructive-foreground",
                });
            }
        }
    }, [data, options.throwNotFoundOnNull, options.toastOnError, toast]);

    const editProjectMutation = useMutation({
        mutationFn: async (schema: EditProject) =>
            editProjectById(schema, project_id || params.id),
        onSuccess: async (updatedProject) => {
            queryClient.setQueryData(
                ["project", updatedProject.id],
                updatedProject,
            );

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

            console.log(options.redirectAfterDeleteTo)

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
