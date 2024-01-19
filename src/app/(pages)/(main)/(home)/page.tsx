"use client";
import HomeAnimation from "@/components/main/home/HomeAnimation";
import TextAnimation from "@/components/main/home/TextAnimation";
import ButtonsAnimation from "@/components/main/home/ButtonsAnimation";
import "reactflow/dist/style.css";
import { ReactFlow, Background, Edge, Node } from "reactflow";
import CustomNode from "@/components/main/home/CustomNodes";

const page = () => {
  const homeNodes: Node[] = [
    {
      id: "1",
      data: { label: "Omniscient" },
      position: { x: 1520, y: 300 },
      type: "CustomNode",
    },
    {
      id: "2",
      data: { label: "AI tutor" },
      position: { x: 1240, y: 100 },
      type: "CustomNode",
    },
    {
      id: "3",
      data: { label: "Knowledge Database" },
      position: { x: 1220, y: 300 },
      type: "CustomNode",
    },
    {
      id: "4",
      data: { label: "Your Space" },
      position: { x: 1240, y: 500 },
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
    <div className="flex flex-col w-screen h-screen">
      <div className="top-0 right-0 absolute mt-20 h-3/4 w-screen">
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
      </div>
      <TextAnimation />
      <ButtonsAnimation />
      {/* <div className="pointer-events-none -z-10 top-0 left-0 fixed w-screen h-screen overflow-hidden flex justify-end items-center">
                <HomeAnimation />
            </div> */}
    </div>
  );
};

export default page;
