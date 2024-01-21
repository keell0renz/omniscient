"use server"

import prisma from "@/lib/prisma"
import { Project } from "@prisma/client"
import { unstable_cache } from "next/cache"
import { revalidatePath, revalidateTag } from "next/cache"
import { 
    validateCreateProject, 
    validateSetAIContext, 
    CreateProjectSchema, 
    SetAIContextSchema 
} from "@/schema/project"
import { auth } from "@clerk/nextjs"

export async function getPublicProjects(): Promise<Project[]> {
    return await unstable_cache(
        async (): Promise<Project[]> => {
            try {
                return await prisma.project.findMany({
                    where: {
                        public: true
                    }
                })
        
            } catch(error) {
                throw new Error(`Failed to retrieve public projects: ${error}`);
            }
        },
        undefined,
        { tags: ["public_projects"], revalidate: 60 * 60 }
    )()
}

export async function getProjectsByUser(): Promise<Project[]> {
    const { userId } = auth()

    if (!userId) {
        throw Error("Not authenticated!")
    }

    return await unstable_cache(
        async (): Promise<Project[]> => {
            try {
                return await prisma.project.findMany({
                    where: {
                        user_id: userId
                    }
                })
            } catch (error) {
                throw new Error(`Failed to retrieve projects by user: ${error}`)
            }
        },
        undefined,
        { tags: [`projects_${userId}`], revalidate: 60 * 60 }
    )()
}

export async function getProjectById(project_id: string): Promise<Project | null> {
    const { userId } = auth()

    if (!userId) {
        throw Error("Not authenticated!")
    }

    return await unstable_cache(
        async (): Promise<Project | null> => {
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
        },
        undefined,
        { tags: [`project_${project_id}`], revalidate: 60 * 60 }
    )()
}