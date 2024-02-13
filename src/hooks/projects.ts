"use client";

import { useToast } from "@/components/ui/use-toast";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { Project } from "@/types/projects";
import {
    getProjectById,
    searchProjectsByUser,
    searchPublicProjects,
} from "@/server/projects";
import { getUserProjectsKey, getPublicProjectsKey } from "@/utils/projects";

export function useUserProjects(query?: string) {
    const { data, error, size, setSize, isValidating, isLoading, mutate } =
        useSWRInfinite<Project[]>(getUserProjectsKey, async (key) => {
            return await searchProjectsByUser(
                query,
                parseInt(key.split(":")[1]),
            );
        }, { revalidateOnFocus: false });

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
        useSWRInfinite<Project[]>(getPublicProjectsKey, async (key) => {
            return await searchPublicProjects(
                query,
                parseInt(key.split(":")[1]),
            );
        }, { revalidateOnFocus: false });

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
            `project_id:${project_id}`,
            async (key) => {
                return await getProjectById(project_id);
            },
            { revalidateOnFocus: false },
        );

    const { toast } = useToast();

    if (error) {
        toast({
            title: "An error occurred!",
            description: `${error}`,
        });
    }

    return {
        data,
        error,
        isLoading,
        isValidating,
        isFetching: isLoading || isValidating,
        mutate,
    };
}
