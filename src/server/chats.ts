"use server"

import prisma from "@/lib/prisma"
import { Chat, Message } from "@prisma/client"
import { Message as MessageSchema } from "ai"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"

export async function createChat(project_id: string, node_id: string): Promise<Chat> {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    revalidatePath(`/p/${project_id}/n/${node_id}`)

    return await prisma.chat.create({
        data: {
            node_id: node_id,
            project_id: project_id
        }
    })
}

export async function deleteChat(project_id: string, node_id: string, chat_id: string) {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    await prisma.message.deleteMany({
        where: {
            chat_id: chat_id
        }
    })

    await prisma.chat.delete({
        where: {
            id: chat_id
        }
    })

    revalidatePath(`/p/${project_id}/n/${node_id}`)
}

export async function insertMessageIntoChat(message: MessageSchema, project_id: string, node_id: string, chat_id: string) {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    await prisma.message.create({
        data: {
            chat_id: chat_id,
            node_id: node_id,
            project_id: project_id,
            role: message.role,
            content: message.content
        }
    })
}

export async function getMessagesByChat(chat_id: string): Promise<MessageSchema[]> {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    const message_records = await prisma.message.findMany({
        where: {
            chat_id: chat_id
        }
    })

    const messages: MessageSchema[] = message_records.map((record) => ({
        id: record.id,
        role: record.role as "function" | "system" | "user" | "assistant" | "data" | "tool",
        content: record.content
    }))

    return messages
}