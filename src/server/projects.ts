"use server";

import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/utils/prisma";
import {
    Project,
    ProjectPanelCard,
    PublicProjectCard,
    CreateProject,
    EditProject,
} from "@/types/projects";
import { validateCreateProject, validateEditProject } from "@/schema/projects";
import { auth } from "@clerk/nextjs/server";

export async function searchPublicProjects(
    query?: string,
    page: number = 1,
    limit: number = 9,
): Promise<PublicProjectCard[]> {
    try {
        const whereClause = query
            ? {
                  OR: [
                      {
                          title: { contains: query },
                          public: true,
                      },
                      {
                          description: { contains: query },
                          public: true,
                      },
                  ],
              }
            : { public: true };

        const skip = (Math.max(page, 1) - 1) * limit;

        return await prisma.project.findMany({
            where: whereClause,
            skip,
            take: limit,
        });
    } catch (error) {
        throw new Error(handlePrismaError(error));
    }
}

export async function searchProjectsByUser(
    query?: string,
    page: number = 1,
    limit: number = 9,
): Promise<ProjectPanelCard[]> {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Not authenticated!");
    }

    try {
        const whereClause = query
            ? {
                  OR: [
                      {
                          title: { contains: query },
                          user_id: userId,
                      },
                      {
                          description: { contains: query },
                          user_id: userId,
                      },
                  ],
              }
            : { user_id: userId };

        const skip = (Math.max(page, 1) - 1) * limit;

        const projects = await prisma.project.findMany({
            where: whereClause,
            skip,
            take: limit,
            include: {
                parent: {
                    select: {
                        user_id: true,
                    },
                },
            },
        });

        return projects.map((project) => ({
            ...project,
            parent_user_id: project.parent?.user_id,
        }));
    } catch (error) {
        throw new Error(handlePrismaError(error));
    }
}

export async function getProjectById(
    project_id: string,
): Promise<Project | null> {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Not authenticated!");
    }

    try {
        return await prisma.project.findFirst({
            where: {
                user_id: userId,
                id: project_id,
            },
        });
    } catch (error) {
        throw new Error(handlePrismaError(error));
    }
}

export async function createProjectWithSchema(
    schema: CreateProject,
): Promise<Project> {
    const { userId } = auth();

    if (!userId) {
        throw Error("Not authenticated!");
    }

    const validated = validateCreateProject.safeParse(schema);

    if (!validated.success) {
        throw new Error(`Failed schema validation: ${validated.error}`);
    }

    try {
        return await prisma.project.create({
            data: {
                title: validated.data.title,
                description: validated.data.description,
                user_id: userId,
            },
        });
    } catch (error) {
        throw new Error(handlePrismaError(error));
    }
}

export async function editProjectById(
    schema: EditProject,
    project_id: string,
): Promise<Project> {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Not authenticated!");
    }

    const validated = validateEditProject.safeParse(schema);

    if (!validated.success) {
        throw new Error(`Failed schema validation: ${validated.error}`);
    }

    try {
        return await prisma.project.update({
            where: {
                id: project_id,
                user_id: userId,
            },
            data: {
                title: validated.data.title,
                description: validated.data.description,
                ai_context: validated.data.ai_context,
                public: validated.data.public,
            },
        });
    } catch (error) {
        throw new Error(`Failed to update project: ${error}`);
    }
}

export async function deleteProjectById(project_id: string): Promise<void> {
    const { userId } = auth();

    if (!userId) throw new Error("Not authenticated!");

    try {
        await prisma.project.delete({
            where: {
                id: project_id,
                user_id: userId,
            },
        });
    } catch (error) {
        throw new Error(handlePrismaError(error));
    }
}

export async function importPublicProject(
    project_id: string,
): Promise<Project> {
    const { userId } = auth();

    if (!userId) throw new Error("Not authenticated!");

    try {
        const parent_project = await prisma.project.findFirst({
            where: {
                id: project_id,
                public: true,
            },
        });

        if (!parent_project) {
            throw new Error(`Project not found or not public!`);
        }

        return await prisma.project.create({
            data: {
                title: parent_project.title,
                description: parent_project.description,
                ai_context: parent_project.ai_context,
                user_id: userId,
                imported_from_id: parent_project.id,
            },
        });
    } catch (error) {
        throw new Error(handlePrismaError(error));
    }
}
