"use client";

import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { Project, ProjectPanelCard, PublicProjectCard } from "@/types/projects";
import {
    getProjectById,
    searchProjectsByUser,
    searchPublicProjects,
} from "@/server/projects";
import { getUserProjectsKey, getPublicProjectsKey } from "@/utils/projects";

export function useUserProjects(query?: string) {
    const { data, error, size, setSize, isValidating, isLoading, mutate } =
        useSWRInfinite<ProjectPanelCard[]>(
            getUserProjectsKey(query),
            async (key) => {
                return await searchProjectsByUser(key.query, key.page);
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

    return {
        data,
        error,
        isLoading,
        isValidating,
        isFetching: isLoading || isValidating,
        mutate,
    };
}
