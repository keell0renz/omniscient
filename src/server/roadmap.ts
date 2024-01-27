import prisma from "@/lib/prisma"
import { Project } from "@prisma/client"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import { GraphNodeValidator, GraphNodeSchema } from "@/schema/roadmap"
import { Node, Edge, Connection } from "reactflow"
import { v4 as uuidv4 } from 'uuid';

const nodes = [
    {
      id: "1",
      data: {
        label: "Computer Science",
        about: null,
        status: "default",
        primary_key: "primary_key",
        project_id: "project_id"
      },
      position: { x: 100, y: 100 },
      type: "Node",
    },
    {
      id: "2",
      data: {
        label: "Computer Science",
        about: null,
        status: "learning",
        primary_key: "primary_key",
        project_id: "project_id"
      },
      position: { x: 100, y: 200 },
      type: "Node",
    },
    {
      id: "3",
      data: {
        label: "Computer Science",
        about: null,
        status: "skipped",
        primary_key: "primary_key",
        project_id: "project_id"
      },
      position: { x: 100, y: 300 },
      type: "Node",
    },
    {
      id: "4",
      data: {
        label: "Computer Science",
        about: null,
        status: "finished",
        primary_key: "primary_key",
        project_id: "project_id"
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

export async function createNode(project_id: string, x_pos: number, y_pos: number): Promise<Node>  {
    const generatedId = uuidv4(); // Generate a new UUID v4
    const generatedPrimaryKey = uuidv4(); // Generate a new UUID v4 for primary_key if needed

    console.log(`Create Node - project_id: ${project_id}, x: ${x_pos}, y: ${y_pos}`);

    return {
        id: generatedId,
        data: {
          label: null,
          about: null,
          status: "default",
          primary_key: generatedPrimaryKey,
          project_id: project_id
        },
        position: { x: x_pos, y: y_pos },
        type: "Node"
    }
}

export async function createEdge(project_id: string, connection: Connection) {
    console.log(`Create Edge - project_id: ${project_id}, source: ${connection.source}, target: ${connection.target}, sourceHandle: ${connection.sourceHandle}, targetHandle: ${connection.targetHandle}`);
}

export async function editNode(project_id: string, schema: GraphNodeSchema, node_id: string) {
    console.log(`Edit Node - project_id: ${project_id}, node_id: ${node_id}, schema: ${JSON.stringify(schema)}`);
}

export async function editNodeStatus(project_id: string, status: "learning" | "skipped" | "finished" | "default", node_id: string) {
    console.log(`Edit Node Status - project_id: ${project_id}, node_id: ${node_id}, status: ${status}`);
}

export async function moveNode(project_id: string, primary_key: string, x_pos: number, y_pos: number) {
    console.log(`Move Node - project_id: ${project_id}, primary_key: ${primary_key}, x: ${x_pos}, y: ${y_pos}`);
}

export async function deleteNodes(project_id: string, primary_keys: string[]) {
    console.log(`Delete Nodes - project_id: ${project_id}, primary_keys: ${primary_keys.join(', ')}`);
}

export async function deleteEdges(project_id: string, connections: Connection[]) {
    connections.forEach(connection => {
        console.log(`Delete Edge - project_id: ${project_id}, source: ${connection.source}, target: ${connection.target}, sourceHandle: ${connection.sourceHandle}, targetHandle: ${connection.targetHandle}`);
    });
}