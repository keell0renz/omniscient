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
import { clerkClient } from "@clerk/nextjs";

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

        const skip = page * limit;

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

        const skip = page * limit;

        // Renamed to avoid redeclaration
        const foundProjects = await prisma.project.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: {
                created_at: "desc",
            },
            include: {
                parent: {
                    select: {
                        user_id: true,
                    },
                },
            },
        });

        // Add the parent_user_id property to the project type if it doesn't exist
        const projectsWithParent = foundProjects.map((project) => ({
            ...project,
            parent_user_id: project.parent?.user_id || null, // Handle null case
        }));

        const parentUserIds = projectsWithParent
            .filter((project) => project.parent_user_id)
            .map((project) => project.parent_user_id as string);

        const parentUsers = await Promise.all(
            parentUserIds.map((userId) => clerkClient.users.getUser(userId)),
        );

        const parentUsersMap = parentUsers.reduce(
            (acc, user) => {
                if (user && user.id) {
                    // Check for null user.id
                    acc[user.id] = {
                        username: user.username || "", // Handle null username
                        avatarUrl: user.imageUrl || "", // Handle null avatarUrl
                    };
                }
                return acc;
            },
            {} as Record<string, { username: string; avatarUrl: string }>,
        );

        const enrichedProjects = projectsWithParent.map((project) => {
            const parentInfo = project.parent_user_id
                ? parentUsersMap[project.parent_user_id]
                : undefined;
            return {
                ...project,
                parent_user_id: project.parent_user_id || undefined, // Change null to undefined
                parent_username: parentInfo?.username,
                parent_avatar_url: parentInfo?.avatarUrl,
            };
        });

        return enrichedProjects;
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
