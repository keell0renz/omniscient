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
    redirectAfterCreationTo: string | null;
    redirectAfterImportTo: string | null;
}

const useNewProjectDefaultOptions = {
    toastOnError: true,
    toastOnSuccess: true,
    redirectAfterCreationTo: null,
    redirectAfterImportTo: null,
} satisfies useNewProjectOptions;

export default function useNewProject(
    options: useNewProjectOptions = useNewProjectDefaultOptions,
) {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { toast } = useToast();

    const createProjectMutation = useMutation({
        mutationFn: async ({ schema }: { schema: CreateProject }) =>
            createProjectWithSchema(schema),
        onSuccess: async () => {
            if (options.redirectAfterCreationTo)
                router.push(options.redirectAfterCreationTo);
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
        mutationFn: async ({ parent_id }: { parent_id: string }) =>
            importPublicProject(parent_id),
        onSuccess: async () => {
            if (options.redirectAfterImportTo)
                router.push(options.redirectAfterImportTo);
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
