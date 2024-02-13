"use client";

import { useToast } from "@/components/ui/use-toast";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { Project, CreateProject, EditProject } from "@/types/projects";
import {
    getProjectById,
    searchProjectsByUser,
    searchPublicProjects,
    editProjectById,
    deleteProjectById,
} from "@/server/projects";

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

    const editProject = async (editData: EditProject) => {
        try {
            if (data) {
                mutate({ ...data, ...editData }, { revalidate: false });
                await editProjectById({ ...data, ...editData }, project_id);
            }
        } catch (error) {
            toast({
                title: "An error occurred!",
                description: `${error}`,
            });
            mutate(undefined, { revalidate: true });
        }
    };

    const deleteProject = async () => {
        try {
            if (data) {
                await deleteProjectById(project_id);
                mutate(undefined, { revalidate: false });
            }
        } catch (error) {
            toast({
                title: "An error occurred!",
                description: `${error}`,
            });
            mutate(undefined, { revalidate: true });
        }
    };

    return {
        data,
        error,
        isLoading,
        isValidating,
        mutate,
        editProject,
        deleteProject,
    };
}

export function useUserProjects(query?: string) {}

export function usePublicProjects(query?: string) {}
