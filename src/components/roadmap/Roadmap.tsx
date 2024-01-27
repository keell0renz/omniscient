"use client";

import "reactflow/dist/style.css";
import ReactFlow, { Controls, Background } from "reactflow";
import { Node, Edge, Connection } from "reactflow";
import useNodeStore from "@/store/NodeStore";
import {
  createNode,
  createEdge,
  editNode,
  moveNode,
  deleteNodes,
  deleteEdges,
} from "@/server/roadmap";

import "reactflow/dist/style.css";

import CustomNode from "./Node";

const nodeTypes = { Node: CustomNode };

export default function Roadmap({
  nodes,
  edges,
}: {
  nodes: Node[];
  edges: Edge[];
}) {
  const { setCurrentNode } = useNodeStore();

  return (
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
          const primary_keys: string[] = nodes.map(
            (node) => node.data.primary_key,
          );
          await deleteNodes(primary_keys);
        }}
        onConnect={async (connection: Connection) => {
          await createEdge(connection);
        }}
        onEdgesDelete={async (edges: Edge[]) => {
          const connections: Connection[] = edges.map((edge) => ({
            source: edge.source,
            target: edge.target,
            sourceHandle: edge.sourceHandle || null, // Coalesce undefined to null
            targetHandle: edge.targetHandle || null, // Coalesce undefined to null
          }));

          await deleteEdges(connections);
        }}
      >
        <Background color="#49495c" />
      </ReactFlow>
    </div>
  );
}
