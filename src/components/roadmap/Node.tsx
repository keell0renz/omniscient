"use client"

import { useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";

type CustomNodeData = {
  label: string;
  status: null | "learning" | "skipped" | "finished"
};

export default function CustomNode(props: NodeProps<CustomNodeData>) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer"
    >
      <div
        className={`
            rounded-xl bg-background/70 border cursor-pointer px-3 py-2 
            ${props.selected && "border-slate-400"}
            ${props.data.status === "learning" && "border-yellow-500/60"}
            ${( props.data.status === "learning" && props.selected ) && "!border-yellow-500"}
            ${props.data.status === "skipped" && "border-red-500/60"}
            ${( props.data.status === "skipped" && props.selected ) && "!border-red-500"}
            ${props.data.status === "finished" && "border-green-500/60"}
            ${( props.data.status === "finished" && props.selected ) && "!border-green-500"}
        `}
      >
        {props.data.label}
      </div>
      <div style={{ visibility: ( isHovered && !props.selected ) ? "visible" : "hidden" }}>
        <Handle type="target" position={Position.Top} id="a" className="p-1"/> 
        <Handle type="source" position={Position.Top} id="a" className="p-1" /> 
        <Handle type="target" position={Position.Right} id="b" className="p-1" /> 
        <Handle type="source" position={Position.Right} id="b" className="p-1" /> 
        <Handle type="target" position={Position.Bottom} id="c" className="p-1" /> 
        <Handle type="source" position={Position.Bottom} id="c" className="p-1" /> 
        <Handle type="target" position={Position.Left} id="d" className="p-1" /> 
        <Handle type="source" position={Position.Left} id="d" className="p-1" />
      </div>
    </div>
  );
}

