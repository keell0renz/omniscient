"use client";

import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import {
    CreateProject,
    EditProject,
    Project,
    ProjectPanelCard,
    PublicProjectCard,
} from "@/types/projects";
import {
    getProjectById,
    searchProjectsByUser,
    searchPublicProjects,
    editProjectById,
    deleteProjectById,
    createProjectWithSchema,
    importPublicProject,
} from "@/server/projects";
import { getUserProjectsKey, getPublicProjectsKey } from "@/utils/projects";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function useNewProject() {
    const router = useRouter();
    const [isMutating, setIsMutating] = useState(false);
    const { toast } = useToast();

    const createProject = async (schema: CreateProject) => {
        try {
            setIsMutating(true);

            const new_project = await createProjectWithSchema(schema);

            router.push(`/p/${new_project.id}`);
        } catch (error) {
            toast({
                title: "An error occurred",
                description: `${error}`,
                className: "bg-desctructive text-destructive-foreground",
            });
        } finally {
            setIsMutating(false);
        }
    };

    const importProject = async (parent_id: string) => {
        try {
            setIsMutating(true);

            const new_project = await importPublicProject(parent_id);

            router.push(`/p/${new_project.id}`);
        } catch (error) {
            toast({
                title: "An error occurred",
                description: `${error}`,
                className: "bg-desctructive text-destructive-foreground",
            });
        } finally {
            setIsMutating(false);
        }
    };

    return {
        isMutating,
        createProject,
        importProject,
    };
}

export function useUserProjects(query?: string) {
    const { data, error, size, setSize, isValidating, isLoading, mutate } =
        useSWRInfinite<ProjectPanelCard[]>(
            getUserProjectsKey(query),
            async (key) => {
                return await searchProjectsByUser(key.query, key.page);
            },
            {
                revalidateOnMount: true,
                revalidateAll: true,
                revalidateOnFocus: false,
            },
        );

    const { toast } = useToast();

    if (error)
        toast({
            title: "Error!",
            description: error,
            className: "bg-destructive text-destructive-foreground",
        });

    return {
        data,
        error,
        size,
        setSize,
        isLoading,
        isValidating,
        isFetching: isLoading || isValidating,
        mutate,
    };
}

export function usePublicProjects(query?: string) {
    const { data, error, size, setSize, isValidating, isLoading, mutate } =
        useSWRInfinite<PublicProjectCard[]>(
            getPublicProjectsKey(query),
            async (key) => {
                return await searchPublicProjects(key.query, key.page);
            },
            {
                revalidateOnMount: true,
                revalidateAll: true,
                revalidateOnFocus: false,
            },
        );

    const { toast } = useToast();

    if (error)
        toast({
            title: "Error!",
            description: error,
            className: "bg-destructive text-destructive-foreground",
        });

    return {
        data,
        error,
        size,
        setSize,
        isLoading,
        isValidating,
        isFetching: isLoading || isValidating,
        mutate,
    };
}

export function useProject(project_id: string) {
    const { data, error, isLoading, isValidating, mutate } =
        useSWR<Project>(
            project_id,
            async (key) => {
                return await getProjectById(key);
            },
            { revalidateOnFocus: false, revalidateOnMount: false },
        );

    const [isMutating, setIsMutating] = useState(false);

    const { toast } = useToast();

    const editProject = async (schema: EditProject) => {
        try {
            setIsMutating(true);

            await editProjectById(schema, project_id);

            mutate();
        } catch (error) {
            toast({
                title: "An error occurred",
                description: `${error}`,
                className: "bg-desctructive text-destructive-foreground",
            });
        } finally {
            setIsMutating(false);
        }
    };

    const deleteProject = async () => {
        try {
            setIsMutating(true);

            await deleteProjectById(project_id);

            mutate(undefined, { revalidate: false });
        } catch (error) {
            toast({
                title: "An error occurred",
                description: `${error}`,
                className: "bg-desctructive text-destructive-foreground",
            });
        } finally {
            setIsMutating(false);
        }
    };

    if (error)
        toast({
            title: "Error!",
            description: error,
            className: "bg-destructive text-destructive-foreground",
        });

    return {
        data,
        error,
        isLoading,
        isValidating,
        isMutating,
        isFetching: isLoading || isValidating,
        mutate,
        editProject,
        deleteProject
    };
}
