"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { CreateProject } from "@/types/projects";
import {
    createProjectWithSchema,
    importPublicProject,
} from "@/server/projects";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface useNewProjectOptions {
    toastOnError?: boolean;
    toastOnSuccess?: boolean;
    redirectAfterCreationToProject: boolean;
    redirectAfterImportToProject: boolean;
}

const useNewProjectDefaultOptions = {
    toastOnError: true,
    toastOnSuccess: true,
    redirectAfterCreationToProject: true,
    redirectAfterImportToProject: true,
} satisfies useNewProjectOptions;

export default function useNewProject(
    options: useNewProjectOptions = useNewProjectDefaultOptions,
) {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { toast } = useToast();

    const createProjectMutation = useMutation({
        mutationFn: async (schema: CreateProject) =>
            createProjectWithSchema(schema),
        onSuccess: async (newProject) => {
            if (options.redirectAfterCreationToProject)
                router.push(`/p/${newProject.id}`);
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: `${error.message}`,
                className: "bg-destructive text-destructive-foreground",
            });
        },
    });

    const importProjectMutation = useMutation({
        mutationFn: async (parent_id: string) =>
            importPublicProject(parent_id),
        onSuccess: async (newProject) => {
            if (options.redirectAfterImportToProject)
                router.push(`/p/${newProject.id}`);
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: `${error.message}`,
                className: "bg-destructive text-destructive-foreground",
            });
        },
    });

    return {
        isMutating:
            createProjectMutation.isPending || importProjectMutation.isPending,
        createProject: createProjectMutation.mutate,
        importProject: importProjectMutation.mutate,
    };
}
