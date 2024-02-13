"use server";

import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/lib/utils";
import {
    Project,
    ProjectPanelCard,
    PublicProjectCard,
    CreateProject,
    EditProject,
    SetAIContext,
} from "@/types/projects";
import {
    validateCreateProject,
    validateEditProject,
    validateSetAIContext,
} from "@/schema/projects";
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
                          title: { contains: query, mode: "insensitive" },
                          public: true,
                      },
                      {
                          description: { contains: query, mode: "insensitive" },
                          public: true,
                      },
                  ],
              }
            : { public: true };

        const skip = (page - 1) * limit;

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
                          title: { contains: query, mode: "insensitive" },
                          user_id: userId,
                      },
                      {
                          description: { contains: query, mode: "insensitive" },
                          user_id: userId,
                      },
                  ],
              }
            : { user_id: userId };

        const skip = (page - 1) * limit;

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

export async function createProject(schema: CreateProject) {
    const { userId } = auth();

    if (!userId) {
        throw Error("Not authenticated!");
    }

    const validated = validateCreateProject.safeParse(schema);

    if (!validated.success) {
        throw new Error(`Failed schema validation: ${validated.error}`);
    }

    try {
        await prisma.project.create({
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

export async function editProject(schema: EditProject, project_id: string) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Not authenticated!");
    }

    const validated = validateEditProject.safeParse(schema);

    if (!validated.success) {
        throw new Error(`Failed schema validation: ${validated.error}`);
    }

    try {
        await prisma.project.update({
            where: {
                id: project_id,
                user_id: userId,
            },
            data: {
                title: validated.data.title,
                description: validated.data.description,
            },
        });
    } catch (error) {
        throw new Error(`Failed to update project: ${error}`);
    }
}

export async function setAIContextForProject(
    schema: SetAIContext,
    project_id: string,
) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Not authenticated!");
    }

    const validated = validateSetAIContext.safeParse(schema);

    if (!validated.success) {
        throw new Error(`Failed schema validation: ${validated.error}`);
    }

    try {
        await prisma.project.update({
            where: {
                id: project_id,
                user_id: userId,
            },
            data: {
                ai_context: validated.data.ai_context,
            },
        });
    } catch (error) {
        throw new Error(handlePrismaError(error));
    }
}

export async function setProjectPublicity(
    published: boolean,
    project_id: string,
) {
    const { userId } = auth();

    if (!userId) throw new Error("Not authenticated!");

    try {
        await prisma.project.update({
            where: {
                id: project_id,
                user_id: userId,
            },
            data: {
                public: published,
            },
        });
    } catch (error) {
        throw new Error(handlePrismaError(error));
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

export async function importPublicProject(project_id: string) {
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

        await prisma.project.create({
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
