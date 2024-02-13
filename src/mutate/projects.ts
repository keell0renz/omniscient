"use client";

import { useToast } from "@/components/ui/use-toast";
import { mutate, unstable_serialize } from "swr";
import { Project, CreateProject, EditProject } from "@/types/projects";
import {
    editProjectById,
    deleteProjectById,
    createProjectWithSchema,
    importPublicProject,
} from "@/server/projects";
import { getUserProjectsKey, getPublicProjectsKey } from "@/utils/projects";

export async function createProject(schema: CreateProject) {
    const { toast } = useToast();

    try {
        await createProjectWithSchema(schema);
    } catch (error) {
        toast({
            title: "An error occurred!",
            description: `${error}`,
        });
    } finally {
        mutate(unstable_serialize(getUserProjectsKey))
    }
}

export async function importProject(project_id: string) {
    const { toast } = useToast();

    try {
        await importPublicProject(project_id);
    } catch (error) {
        toast({
            title: "An error occurred!",
            description: `${error}`,
        });
    }
}

export async function editProject(project_id: string, updatedData: EditProject) {
    const { toast } = useToast();

    try {
        await editProjectById(updatedData, project_id);
        mutate(`project_id:${project_id}`, undefined, {
            optimisticData: (project) => ({...project, ...updatedData})
        })

    } catch (error) {
        toast({
            title: "An error occurred!",
            description: `${error}`,
        });
    }
}

export async function deleteProject(project_id: string) {
    const { toast } = useToast();

    try {
        await deleteProjectById(project_id);
    } catch (error) {
        toast({
            title: "An error occurred!",
            description: `${error}`,
        });
    }
}