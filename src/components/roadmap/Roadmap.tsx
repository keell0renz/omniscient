"use client";

import "reactflow/dist/style.css";
import ReactFlow, { Controls, Background } from "reactflow";
import { Node, Edge, Connection } from "reactflow";
import useNodeStore from "@/store/NodeStore";

import "reactflow/dist/style.css";

import CustomNode from "./Node";

const nodes = [
  {
    id: "1",
    data: {
      label: "Computer Science",
      status: "unknown",
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

export default function Roadmap({ project_id }: { project_id: string }) {
  const { setCurrentNode } = useNodeStore();
  return (
    <div className="w-full h-full">
      <ReactFlow
        defaultNodes={nodes}
        defaultEdges={edges}
        nodeTypes={{ Node: CustomNode }}
        proOptions={{ hideAttribution: true }}
        onNodeDragStop={(
          event: React.MouseEvent,
          node: Node,
          nodes: Node[],
        ) => {
          console.log(JSON.stringify(node));
        }}
        onNodeClick={(event: React.MouseEvent, node: Node) => {
          setCurrentNode(node);
        }}
        onNodesDelete={(nodes: Node[]) => {
          console.log(JSON.stringify(nodes));
        }}
        onConnect={(connection: Connection) => {
          console.log(JSON.stringify(connection));
        }}
        onEdgesDelete={(edges: Edge[]) => {
          console.log(JSON.stringify(edges));
        }}
      >
        <Background color="#49495c" />
      </ReactFlow>
    </div>
  );
}
