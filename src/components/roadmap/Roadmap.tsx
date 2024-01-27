"use client";

import "reactflow/dist/style.css";
import ReactFlow, { Controls, Background } from "reactflow";
import { Node, Edge, Connection } from "reactflow";
import useNodeStore from "@/store/NodeStore";
import {
  createNode,
  createEdge,
  moveNode,
  deleteNodes,
  deleteEdges,
} from "@/server/roadmap";
import { ReactFlowProvider } from "reactflow";
import { NodeManage } from ".";
import { useReactFlow } from "reactflow";

import "reactflow/dist/style.css";

import CustomNode from "./Node";

const nodeTypes = { Node: CustomNode };

function LocalRoadmap({
  nodes,
  edges,
  project_id,
}: {
  nodes: Node[];
  edges: Edge[];
  project_id: string;
}) {
  const { setCurrentNode } = useNodeStore();
  const reactflow = useReactFlow();

  return (
    <>
      <div className="w-full h-full">
        <ReactFlow
          defaultNodes={nodes}
          defaultEdges={edges}
          nodeTypes={nodeTypes}
          proOptions={{ hideAttribution: true }}
          onNodeDragStop={async (
            event: React.MouseEvent,
            node: Node,
            nodes: Node[],
          ) => {
            if (node.dragging) {
              await moveNode(
                project_id,
                node.data.primary_key,
                node.position.x,
                node.position.y,
              );
            }
          }}
          onNodeClick={(event: React.MouseEvent, node: Node) => {
            setCurrentNode(node);
          }}
          onNodesDelete={async (nodes: Node[]) => {
            setCurrentNode(null);
            const primary_keys: string[] = nodes.map(
              (node) => node.data.primary_key,
            );
            await deleteNodes(project_id, primary_keys);
          }}
          onConnect={async (connection: Connection) => {
            await createEdge(project_id, connection);
          }}
          onEdgesDelete={async (edges: Edge[]) => {
            const connections: Connection[] = edges.map((edge) => ({
              source: edge.source,
              target: edge.target,
              sourceHandle: edge.sourceHandle || null, // Coalesce undefined to null
              targetHandle: edge.targetHandle || null, // Coalesce undefined to null
            }));

            await deleteEdges(project_id, connections);
          }}
          onContextMenu={async (event: React.MouseEvent) => {
            event.preventDefault(); // Prevent the default context menu from opening
            const x = event.clientX - 50; // X coordinate of the mouse pointer
            const y = event.clientY - 110; // Y coordinate of the mouse pointer

            // Now you can use x and y for your purposes
            const node = await createNode(project_id, x, y);

            reactflow.addNodes(node);
          }}
        >
          <Background color="#49495c" />
        </ReactFlow>
      </div>
      <NodeManage project_id={project_id} />
    </>
  );
}

export default function Roadmap({
  nodes,
  edges,
  project_id,
}: {
  nodes: Node[];
  edges: Edge[];
  project_id: string;
}) {
  return (
    <ReactFlowProvider>
      <LocalRoadmap nodes={nodes} edges={edges} project_id={project_id} />
    </ReactFlowProvider>
  );
}
