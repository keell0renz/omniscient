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

export function useUserProjects(query?: string) {
    const { data, error, size, setSize, isValidating, isLoading, mutate } =
        useSWRInfinite<ProjectPanelCard[]>(
            getUserProjectsKey(query),
            async (key) => {
                return await searchProjectsByUser(key.query, key.page);
            },
            { revalidateOnFocus: false },
        );

    const [isMutating, setIsMutating] = useState(false);

    const { toast } = useToast();

    const createProject = async (schema: CreateProject) => {
        try {
            setIsMutating(true);

            await createProjectWithSchema(schema);

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

    const importProject = async (parent_id: string) => {
        try {
            setIsMutating(true);

            await importPublicProject(parent_id);

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

    return {
        data,
        error,
        size,
        setSize,
        isLoading,
        isValidating,
        isMutating,
        isFetching: isLoading || isValidating,
        mutate,
        createProject,
        importProject
    };
}

export function usePublicProjects(query?: string) {
    const { data, error, size, setSize, isValidating, isLoading, mutate } =
        useSWRInfinite<PublicProjectCard[]>(
            getPublicProjectsKey(query),
            async (key) => {
                return await searchPublicProjects(key.query, key.page);
            },
            { revalidateOnFocus: false },
        );

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
        useSWR<Project | null>(
            { key: "project", project_id: project_id },
            async (key) => {
                return await getProjectById(key.project_id);
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

            mutate(null, { revalidate: false });
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
        data,
        error,
        isLoading,
        isValidating,
        isMutating,
        isFetching: isLoading || isValidating,
        mutate,
        editProject,
    };
}
