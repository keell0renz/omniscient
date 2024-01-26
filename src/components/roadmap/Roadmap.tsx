"use client";

import "reactflow/dist/style.css";
import ReactFlow, {
  Controls,
  Background,
} from "reactflow";

import 'reactflow/dist/style.css';

import Node from "./Node";

const nodes = [
  { id: "1", data: { label: "Node 1" }, position: { x: 100, y: 100 }, type: "Node" },
  { id: "2", data: { label: "Node 2" }, position: { x: 200, y: 200 }, type: "Node" },
  { id: "3", data: { label: "Node 3" }, position: { x: 300, y: 300 }, type: "Node" },
];

const edges = [
  { id: "dsfdsfdsfsd", source: "1", target: "2", sourceHandle: "d", targetHandle: "b", animated: true },
  { id: "dfdsfsdfsdg", source: "1", target: "3", sourceHandle: "d", targetHandle: "b", animated: true },
  { id: "fgfdghdsdfs", source: "1", target: "3", sourceHandle: "d", targetHandle: "b", animated: true },
];

export default function Roadmap({ project_id }: { project_id: string }) {
    return (
        <div className="w-full h-full">
            <ReactFlow
                defaultNodes={nodes}
                defaultEdges={edges}
                nodeTypes={{ Node: Node }}
                proOptions={{ hideAttribution: true }}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}