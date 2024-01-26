"use client"

import { useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";

type CustomNodeData = {
  label: string;
};

export default function Node(props: NodeProps<CustomNodeData>) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-lg text-black bg-white py-2 px-6">
        {`${props.data.label}`}
      </div>
      <div style={{ visibility: isHovered ? "visible" : "hidden" }}>
        {[Position.Top, Position.Right, Position.Bottom, Position.Left].map(
          (pos) => (
            <Handle
              key={pos}
              type="target"
              position={pos}
              id={pos.toLowerCase()}
              className="p-1"
            />
          ),
        )}
        {[Position.Top, Position.Right, Position.Bottom, Position.Left].map(
          (pos) => (
            <Handle
              key={pos}
              type="source"
              position={pos}
              id={pos.toLowerCase()}
              className="p-1"
            />
          ),
        )}
      </div>
    </div>
  );
}
