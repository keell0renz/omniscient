"use client";
import "reactflow/dist/style.css";
import { ReactFlow, Background, Edge, Node } from "reactflow";
import CustomNode from "./CustomNode";

export default function Graph() {
  const homeNodes: Node[] = [
    {
      id: "1",
      data: {
        label: "Omniscient",
        description:
          "Manages the hassle of your entire self-education process.",
      },
      position: { x: 1590, y: 170 },
      type: "CustomNode",
    },
    {
      id: "2",
      data: {
        label: "AI Tutor",
        description:
          "Your learning co-pilot with access to all your context and materials.",
      },
      position: { x: 1150, y: 80 },
      type: "CustomNode",
    },
    {
      id: "3",
      data: {
        label: "Roadmaps",
        description: "Experienced people share with others what and to learn.",
      },
      position: { x: 1100, y: 260 },
      type: "CustomNode",
    },
    {
      id: "4",
      data: {
        label: "Relevant Knowledge",
        description: "Relevant materials are collected and processed for you.",
      },
      position: { x: 1228, y: 430 },
      type: "CustomNode",
    },
  ];

  const homeEdges: Edge[] = [
    {
      id: "1",
      source: "1",
      target: "2",
      sourceHandle: "d",
      targetHandle: "b",
      animated: true,
    },
    {
      id: "2",
      source: "1",
      target: "3",
      sourceHandle: "d",
      targetHandle: "b",
      animated: true,
    },
    {
      id: "3",
      source: "1",
      target: "4",
      sourceHandle: "d",
      targetHandle: "b",
      animated: true,
    },
  ];

  const nodeTypes = { CustomNode: CustomNode };

  return (
    <ReactFlow
    defaultNodes={homeNodes}
    defaultEdges={homeEdges}
    nodeTypes={nodeTypes}
    className="h-full w-full"
    proOptions={{ hideAttribution: true }}
    zoomOnScroll={false}
    zoomOnDoubleClick={false}
    zoomOnPinch={false}
    preventScrolling={false}
  >
    <Background color="#49495c" />
  </ReactFlow>
  );
}
