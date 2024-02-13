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

export async function createProject(schema: CreateProject) {
    // Create project is done on the /projects page, so we have to manually revalidate useUserProjects()
    const { toast } = useToast();

    try {
        await createProjectWithSchema(schema);
    } catch (error) {
        toast({
            title: "An error occurred!",
            description: `${error}`,
        });
    } finally {
        mutate(unstable_serialize(getUserProjectsKey));
    }
}

export async function importProject(project_id: string) {
    // After you import the project you redirect user to /projects and it automatically revalidates on mount.
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

export async function editProject(
    project_id: string,
    updatedData: EditProject,
) {
    // Here we update data of useProject(project_id) optimistically.
    const { toast } = useToast();

    try {
        await editProjectById(updatedData, project_id);
        mutate(`project_id:${project_id}`, undefined, {
            optimisticData: (project) => ({ ...project, ...updatedData }),
            rollbackOnError: true,
        });
    } catch (error) {
        toast({
            title: "An error occurred!",
            description: `${error}`,
        });
    }
}

export async function deleteProject(project_id: string) {
    // After deleting, user is sent again to /projects, and it revalidates automatically on mount.
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
