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

export async function getProjectsByUser(): Promise<Project[]> {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    try {
        return await prisma.project.findMany({
            where: {
                user_id: userId
            }
        })
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

        await prisma.project.create({
            data: {
                title: parent_project.title,
                description: parent_project.description,
                ai_context: parent_project.ai_context,
                user_id: userId,
                imported_from_id: parent_project.id
            }
        })

    } catch (error) {
        throw new Error(`Failed to import project: ${error}`)
    }

    revalidatePath("/projects")
    redirect("/projects")
}