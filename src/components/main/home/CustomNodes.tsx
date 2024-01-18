import { useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";

type CustomNodeData = {
    label: string;
    databaseId: string;
};

export default function CustomNode(props: NodeProps<CustomNodeData>) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="rounded-lg text-foreground bg-background border py-2 px-6">
                {`${props.data.label}`}
            </div>
            <div style={{ visibility: isHovered ? "visible" : "hidden" }}>
                <Handle type="target" position={Position.Top} id="a" className="p-1" />
                <Handle type="source" position={Position.Top} id="a" className="p-1" />
                <Handle
                    type="target"
                    position={Position.Right}
                    id="b"
                    className="p-1"
                />
                <Handle
                    type="source"
                    position={Position.Right}
                    id="b"
                    className="p-1"
                />
                <Handle
                    type="target"
                    position={Position.Bottom}
                    id="c"
                    className="p-1"
                />
                <Handle
                    type="source"
                    position={Position.Bottom}
                    id="c"
                    className="p-1"
                />
                <Handle type="target" position={Position.Left} id="d" className="p-1" />
                <Handle type="source" position={Position.Left} id="d" className="p-1" />
            </div>
        </div>
    );
}
