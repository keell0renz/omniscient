"use client";

import { useToast } from "@/components/ui/use-toast";
import { mutate, unstable_serialize } from "swr";
import { CreateProject, EditProject } from "@/types/projects";
import {
    editProjectById,
    deleteProjectById,
    createProjectWithSchema,
    importPublicProject,
} from "@/server/projects";
import { getUserProjectsKey } from "@/utils/projects";

// Handle exceptions in components using toasters or other local messages, alerts, etc!

export async function createProject(schema: CreateProject) {
    try {
        await createProjectWithSchema(schema);
    } catch (error) {
        throw error;
    } finally {
        mutate(unstable_serialize(getUserProjectsKey));
    }
}

export async function importProject(project_id: string) {
    try {
        await importPublicProject(project_id);
    } catch (error) {
        throw error;
    }
}

export async function editProject(
    project_id: string,
    updatedData: EditProject,
) {
    try {
        await editProjectById(updatedData, project_id);
        mutate(`project_id:${project_id}`, undefined, {
            optimisticData: (project) => ({ ...project, ...updatedData }),
            rollbackOnError: true,
        });
    } catch (error) {
        throw error;
    }
}

export async function deleteProject(project_id: string) {
    try {
        await deleteProjectById(project_id);
    } catch (error) {
        throw error;
    }
}
