"use client";

import "reactflow/dist/style.css";
import ReactFlow, { Controls, Background } from "reactflow";

import "reactflow/dist/style.css";

import Node from "./Node";

const nodes = [
  {
    id: "1",
    data: { label: "Computer Science", status: null },
    position: { x: 100, y: 100 },
    type: "Node",
  },
  {
    id: "2",
    data: { label: "Computer Science", status: "learning" },
    position: { x: 100, y: 200 },
    type: "Node",
  },
  {
    id: "3",
    data: { label: "Computer Science", status: "skipped" },
    position: { x: 100, y: 300 },
    type: "Node",
  },
  {
    id: "4",
    data: { label: "Computer Science", status: "finished" },
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
  },
  {
    id: "dfdsfsdfsdg",
    source: "1",
    target: "3",
    sourceHandle: "d",
    targetHandle: "b",
  },
  {
    id: "fgfdghdsdfs",
    source: "1",
    target: "3",
    sourceHandle: "d",
    targetHandle: "b",
  },
];

export default function Roadmap({ project_id }: { project_id: string }) {
  return (
    <div className="w-full h-full">
      <ReactFlow
        defaultNodes={nodes}
        defaultEdges={[]}
        nodeTypes={{ Node: Node }}
        proOptions={{ hideAttribution: true }}
        fitView
      >
        <Background color="#49495c" />
      </ReactFlow>
    </div>
  );
}
