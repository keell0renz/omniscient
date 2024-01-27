import prisma from "@/lib/prisma"
import { Project } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import { GraphNodeValidator, GraphNodeSchema } from "@/schema/roadmap"
import { Node, Edge, Connection } from "reactflow"

const nodes = [
    {
      id: "1",
      data: {
        label: "Computer Science",
        status: "default",
        primary_key: "primary_key",
      },
      position: { x: 100, y: 100 },
      type: "Node",
    },
    {
      id: "2",
      data: {
        label: "Computer Science",
        status: "learning",
        primary_key: "primary_key",
      },
      position: { x: 100, y: 200 },
      type: "Node",
    },
    {
      id: "3",
      data: {
        label: "Computer Science",
        status: "skipped",
        primary_key: "primary_key",
      },
      position: { x: 100, y: 300 },
      type: "Node",
    },
    {
      id: "4",
      data: {
        label: "Computer Science",
        status: "finished",
        primary_key: "primary_key",
      },
      position: { x: 100, y: 400 },
      type: "Node",
    },
  ];
  
  const edges = [
    {
      id: "dsfdsfdsfsd",
      source: "1",
      target: "2",
      sourceHandle: "d",
      targetHandle: "b",
      data: {
        primary_key: "primary_key",
      },
    },
    {
      id: "dfdsfsdfsdg",
      source: "1",
      target: "3",
      sourceHandle: "d",
      targetHandle: "b",
      data: {
        primary_key: "primary_key",
      },
    },
    {
      id: "fgfdghdsdfs",
      source: "1",
      target: "3",
      sourceHandle: "d",
      targetHandle: "b",
      data: {
        primary_key: "primary_key",
      },
    },
  ];

export async function getNodesByProjectId(project_id: string): Promise<Node[]> {
    return nodes // Temporarily
}

export async function getEdgesByProjectId(project_id: string): Promise<Edge[]> {
    return edges // Temporarily
}

export async function createNode(project_id: string, x_pos: number, y_pos: number) {
    console.log(`Create Node - project_id ${project_id}, x: ${x_pos}, y: ${y_pos}`)
}

export async function createEdge(connection: Connection) {
    console.log(`Create Edge - source: ${connection.source}, target: ${connection.target}, sourceHandle: ${connection.sourceHandle}, targetHandle: ${connection.targetHandle}`);
}

export async function editNode(schema: GraphNodeSchema, node_id: string) {
    console.log(`Edit Node - node_id: ${node_id}, schema: ${JSON.stringify(schema)}`);
}

export async function editNodeStatus(status: "learning" | "skipped" | "finished" | "default", node_id: string) {
    console.log(`Edit Node Status - node_id: ${node_id}, status: ${status}`);
}

export async function moveNode(primary_key: string, x_pos: number, y_pos: number) {
    console.log(`Move Node - primary_key: ${primary_key}, x: ${x_pos}, y: ${y_pos}`);
}

export async function deleteNodes(primary_keys: string[]) {
    console.log(`Delete Nodes - primary_keys: ${primary_keys.join(', ')}`);
}

export async function deleteEdges(connections: Connection[]) {
    connections.forEach(connection => {
        console.log(`Delete Edge - source: ${connection.source}, target: ${connection.target}, sourceHandle: ${connection.sourceHandle}, targetHandle: ${connection.targetHandle}`);
    });
}