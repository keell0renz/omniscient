"use server"

import prisma from "@/lib/prisma"
import { Node as NodeSchema } from "@prisma/client"
import { auth } from "@clerk/nextjs"
import { GraphNodeValidator, GraphNodeSchema } from "@/schema/roadmap"
import { validateSetNodeAIContext, NodeAIContext } from "@/schema/node"
import { Node, Edge, Connection } from "reactflow"
import { revalidatePath } from "next/cache"

export async function setNodeAIContext(schema: NodeAIContext, project_id: string, node_id: string) {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    const validated = validateSetNodeAIContext.safeParse(schema)

    if (!validated.success) {
        throw new Error(`Schema validation failed: ${validated.error}`)
    }

    await prisma.node.update({
        where: {
            id: node_id,
            user_id: userId
        },
        data: {
            ai_context: validated.data.ai_context
        }
    })

    revalidatePath(`/p/${project_id}/n/${node_id}/`)
}

export async function getNodeById(node_id: string): Promise<NodeSchema> {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    return await prisma.node.findUniqueOrThrow({
        where: {
            id: node_id
        }
    })
}

export async function getNodesByProjectId(project_id: string): Promise<Node[]> {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    const node_records = await prisma.node.findMany({
        where: {
            project_id: project_id,
            user_id: userId
        }
    })

    const nodes: Node[] = node_records.map((node_record) => ({
        id: node_record.render_id,
        position: {
            x: node_record.x_pos,
            y: node_record.y_pos
        },
        data: {
            label: node_record.title,
            about: node_record.about,
            primary_key: node_record.id,
            status: node_record.status,
            project_id: node_record.project_id
        },
        type: "Node"
    }));

    return nodes
}

export async function getEdgesByProjectId(project_id: string): Promise<Edge[]> {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    const edge_records = await prisma.edge.findMany({
        where: {
            project_id: project_id,
            user_id: userId
        }
    })

    const edges: Edge[] = edge_records.map((edge_record) => ({
        id: edge_record.render_id,
        source: edge_record.source,
        target: edge_record.target,
        sourceHandle: edge_record.sourceHandle,
        targetHandle: edge_record.targetHandle,
        data: {
            primary_key: edge_record.id
        }
    }));

    return edges
}

export async function createNode(project_id: string, x_pos: number, y_pos: number): Promise<Node> {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    const node_record = await prisma.node.create({
        data: {
            project_id: project_id,
            user_id: userId,
            x_pos: x_pos,
            y_pos: y_pos
        }
    })

    revalidatePath(`/p/${project_id}`)

    return {
        id: node_record.render_id,
        data: {
            label: node_record.title,
            about: node_record.about,
            status: node_record.status,
            primary_key: node_record.id,
            project_id: node_record.project_id
        },
        position: { x: node_record.x_pos, y: node_record.y_pos },
        type: "Node"
    }
}

export async function createEdge(project_id: string, connection: Connection) {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    await prisma.edge.create({
        data: {
            project_id: project_id,
            user_id: userId,
            source: connection.source as string,
            target: connection.target as string,
            sourceHandle: connection.sourceHandle as string,
            targetHandle: connection.targetHandle as string
        }
    })

    revalidatePath(`/p/${project_id}`)
}

export async function editNode(project_id: string, schema: GraphNodeSchema, node_id: string) {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    const validated = GraphNodeValidator.safeParse(schema)

    if (!validated.success) {
        throw Error(`Validation error: ${validated.error}`)
    }

    await prisma.node.update({
        where: {
            id: node_id,
            project_id: project_id,
            user_id: userId
        },
        data: {
            title: validated.data.label,
            about: validated.data.about
        }
    })

    revalidatePath(`/p/${project_id}`)
}

export async function editNodeStatus(project_id: string, status: "learning" | "skipped" | "finished" | "default", node_id: string) {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    await prisma.node.update({
        where: {
            id: node_id,
            project_id: project_id,
            user_id: userId
        },
        data: {
            status: status
        }
    })

    revalidatePath(`/p/${project_id}`)
}

export async function moveNode(project_id: string, node_id: string, x_pos: number, y_pos: number) {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    await prisma.node.update({
        where: {
            id: node_id,
            project_id: project_id,
            user_id: userId
        },
        data: {
            x_pos: x_pos,
            y_pos: y_pos
        }
    })

    revalidatePath(`/p/${project_id}`)
}

export async function deleteNodes(project_id: string, primary_keys: string[]) {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    await prisma.node.deleteMany({
        where: {
            project_id: project_id,
            user_id: userId,
            OR: primary_keys.map((node_id) => ({ id: node_id }))
        }
    })

    revalidatePath(`/p/${project_id}`)
}

export async function deleteEdges(project_id: string, connections: Connection[]) {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Not authenticated!")
    }

    await prisma.edge.deleteMany({
        where: {
            project_id: project_id,
            user_id: userId,
            OR: connections.map((connection) => ({
                source: connection.source as string,
                target: connection.target as string,
                sourceHandle: connection.sourceHandle as string,
                targetHandle: connection.targetHandle as string
            }))
        }
    })

    revalidatePath(`/p/${project_id}`)
}