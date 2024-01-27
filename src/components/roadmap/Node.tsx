"use client";

import { useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";

type CustomNodeData = {
  label: string;
  status: null | "learning" | "skipped" | "finished";
};

const NodeBorder = ({
  status,
  selected,
}: {
  status: CustomNodeData["status"];
  selected: boolean;
}) => {
  const statusClasses = {
    learning: "border-yellow-500/60",
    skipped: "border-red-500/60",
    finished: "border-green-500/60",
  };
  const selectedStatusClasses = {
    learning: "!border-yellow-500",
    skipped: "!border-red-500",
    finished: "!border-green-500",
  };
  let className = "rounded-xl bg-background/70 border cursor-pointer px-3 py-2";
  if (status) {
    className += ` ${statusClasses[status]}`;
    if (selected) {
      className += ` ${selectedStatusClasses[status]}`;
    }
  }
  if (selected) {
    className += " border-slate-400";
  }
  return className;
};

const NodeHandles = ({
  isHovered,
  selected,
}: {
  isHovered: boolean;
  selected: boolean;
}) => (
  <div
    style={{
      visibility: isHovered ? "visible" : "hidden",
    }}
  >
    <Handle type="target" position={Position.Top} id="a" className="p-1" />
    <Handle type="source" position={Position.Top} id="a" className="p-1" />
    <Handle type="target" position={Position.Right} id="b" className="p-1" />
    <Handle type="source" position={Position.Right} id="b" className="p-1" />
    <Handle type="target" position={Position.Bottom} id="c" className="p-1" />
    <Handle type="source" position={Position.Bottom} id="c" className="p-1" />
    <Handle type="target" position={Position.Left} id="d" className="p-1" />
    <Handle type="source" position={Position.Left} id="d" className="p-1" />
  </div>
);

export default function CustomNode(props: NodeProps<CustomNodeData>) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer"
    >
      <div
        className={NodeBorder({
          status: props.data.status,
          selected: props.selected,
        }) + ` ${!props.data.label && "text-foreground/70"}`}
      >
        {props.data.label ? props.data.label : "Untitled"}
      </div>
      <NodeHandles isHovered={isHovered} selected={props.selected} />
    </div>
  );
}
