"use client";

import { mutate, useSWRConfig } from "swr";
import { CreateProject, EditProject } from "@/types/projects";
import {
    editProjectById,
    deleteProjectById,
    createProjectWithSchema,
    importPublicProject,
} from "@/server/projects";

// Handle exceptions in components using toasters or other local messages, alerts, etc!

export async function createProject(schema: CreateProject) {
    mutate(
        key => { console.log(key); return true },
        async () => await createProjectWithSchema(schema),
        {
            populateCache: (new_project, projects) => {
                return [...projects, new_project];
            },
            revalidate: false,
        },
    );
}

export async function importProject(project_id: string) {
    mutate(
        key => Array.isArray(key) && key[0] === "user_projects",
        async () => await importPublicProject(project_id),
        {
            populateCache: (new_project, projects) => {
                return [...projects, new_project];
            },
            revalidate: false,
        },
    );
}

export async function editProject(
    project_id: string,
    updatedData: EditProject,
) {
    mutate(
        (key: any) => key?.key === "project" && key?.project_id === project_id,
        async () => await editProjectById(updatedData, project_id),
        {
            populateCache: (updated_project, projects) => {
                return { ...projects, ...updated_project };
            },
            revalidate: false,
        },
    );
}

export async function deleteProject(project_id: string) {
    mutate(
        (key: any) => key?.key === "project" && key?.project_id === project_id,
        async () => {
            await deleteProjectById(project_id);
            return null; // Explicitly return null after deletion
        },
        { revalidate: false },
    );
}
