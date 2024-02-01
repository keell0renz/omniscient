"use server"

import prisma from "@/lib/prisma"
import { Project } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {
    validateCreateProject,
    validateSetAIContext,
    CreateProjectSchema,
    SetAIContextSchema
} from "@/schema/project"
import { auth } from "@clerk/nextjs"
import { Node, Edge } from "@prisma/client"

export async function getPublicProjects(): Promise<Project[]> {
    try {
        return await prisma.project.findMany({
            where: {
                public: true
            }
        })
    } catch (error) {
        throw new Error(`Failed to retrieve public projects: ${error}`);
    }
}

export async function searchPublicProjects(query: string): Promise<Project[]> {
    try {
        return await prisma.project.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: query,
                        },
                        public: true
                    },
                    {
                        description: {
                            contains: query,
                        },
                        public: true
                    }
                ]
            }
        })
    } catch (error) {
        throw new Error(`Failed to search public projects: ${error}`);
    }
}

export async function getProjectsByUser(): Promise<(Project & { parent_user_id?: string })[]> {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    try {
        const projects = await prisma.project.findMany({
            where: {
                user_id: userId
            },
            include: {
                parent: {
                    select: {
                        user_id: true
                    }
                }
            }
        })

        // Map over the projects to include parent_user_id if the parent exists
        return projects.map(project => ({
            ...project,
            parent_user_id: project.parent?.user_id
        }));
    } catch (error) {
        throw new Error(`Failed to retrieve projects by user: ${error}`)
    }
}

export async function getProjectById(project_id: string): Promise<Project | null> {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    try {
        return await prisma.project.findFirst({
            where: {
                user_id: userId,
                id: project_id
            }
        })
    } catch (error) {
        throw new Error(`Failed to retrieve user's project by id: ${error}`)
    }
}

export async function createProject(schema: CreateProjectSchema) {
    const { userId } = auth()

    if (!userId) {
        throw Error("Not authenticated!")
    }

    const validated = validateCreateProject.safeParse(schema)

    if (!validated.success) {
        throw new Error(`Failed schema validation: ${validated.error}`)
    }

    try {
        await prisma.project.create({
            data: {
                title: validated.data.title,
                description: validated.data.description,
                user_id: userId
            }
        })

    } catch (error) {
        throw new Error(`Failed to create project: ${error}`)
    }

    revalidatePath("/projects")
}

export async function editProject(schema: CreateProjectSchema, project_id: string) {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    const validated = validateCreateProject.safeParse(schema)

    if (!validated.success) {
        throw new Error(`Failed schema validation: ${validated.error}`)
    }

    try {
        await prisma.project.update({
            where: {
                id: project_id,
                user_id: userId
            },
            data: {
                title: validated.data.title,
                description: validated.data.description
            }
        })
    } catch (error) {
        throw new Error(`Failed to update project: ${error}`)
    }

    revalidatePath("/projects")
}

export async function setAIContextForProject(schema: SetAIContextSchema, project_id: string) {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    const validated = validateSetAIContext.safeParse(schema)

    if (!validated.success) {
        throw new Error(`Failed schema validation: ${validated.error}`)
    }

    try {
        await prisma.project.update({
            where: {
                id: project_id,
                user_id: userId
            },
            data: {
                ai_context: validated.data.ai_context
            }
        })

    } catch (error) {
        throw new Error(`Failed to set AI context: ${error}`)
    }

    revalidatePath("/projects")
}

export async function setProjectPublicity(published: boolean, project_id: string) {
    const { userId } = auth()

    if (!userId)
        throw new Error("Not authenticated!")

    try {
        await prisma.project.update({
            where: {
                id: project_id,
                user_id: userId
            },
            data: {
                public: published
            }
        })
    } catch (error) {
        throw new Error(`Failed to set project publicity: ${error}`);
    }

    revalidatePath("/projects")
}

export async function deleteProjectById(project_id: string): Promise<void> {
    const { userId } = auth()

    if (!userId)
        throw new Error("Not authenticated!")

    try {
        await prisma.message.deleteMany({
            where: {
                project_id: project_id
            }
        })

        await prisma.chat.deleteMany({
            where: {
                project_id: project_id
            }
        })

        await prisma.edge.deleteMany({
            where: {
                project_id: project_id
            }
        })

        await prisma.node.deleteMany({
            where: {
                project_id: project_id
            }
        })

        await prisma.project.delete({
            where: {
                id: project_id,
                user_id: userId
            }
        });

    } catch (error) {
        throw new Error(`Failed to delete project: ${error}`);
    }

    revalidatePath("/projects")
}

export async function importPublicProject(project_id: string) {
    const { userId } = auth()

    if (!userId)
        throw new Error("Not authenticated!")

    try {
        const parent_project = await prisma.project.findFirst({
            where: {
                id: project_id,
                public: true,
            }
        })

        if (!parent_project) {
            throw new Error(`Project not found or not public: ${project_id}`);
        }

        const new_project = await prisma.project.create({
            data: {
                title: parent_project.title,
                description: parent_project.description,
                ai_context: parent_project.ai_context,
                user_id: userId,
                imported_from_id: parent_project.id
            }
        })

        const parent_nodes = await prisma.node.findMany({
            where: {
                project_id: project_id
            }
        })

        const parent_edges = await prisma.edge.findMany({
            where: {
                project_id: project_id
            }
        })

        const mapped_nodes: Omit<Node, "id">[] = parent_nodes.map((node) => ({
            title: node.title,
            about: node.about,
            status: "default",
            user_id: userId,
            project_id: new_project.id,
            render_id: node.render_id,
            x_pos: node.x_pos,
            y_pos: node.y_pos,
            ai_context: node.ai_context
        }))

        const mapped_edges: Omit<Edge, "id">[] = parent_edges.map((edge) => ({
            render_id: edge.render_id,
            user_id: userId,
            project_id: new_project.id,
            source: edge.source,
            target: edge.target,
            sourceHandle: edge.sourceHandle,
            targetHandle: edge.targetHandle
        }));

        await prisma.node.createMany({
            data: mapped_nodes
        })

        await prisma.edge.createMany({
            data: mapped_edges
        })

    } catch (error) {
        throw new Error(`Failed to import project: ${error}`)
    }

    revalidatePath("/projects")
    redirect("/projects")
}