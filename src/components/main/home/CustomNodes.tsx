import { Handle, Position, NodeProps } from "reactflow";

type CustomNodeData = {
  label: string;
  databaseId: string;
};

export default function CustomNode(props: NodeProps<CustomNodeData>) {
  return (
    <>
      <div className="rounded-lg text-foreground bg-background border py-2 px-6">
        {`${props.data.label}`}
      </div>
      <div style={{ visibility: "hidden" }}>
        <Handle type="target" position={Position.Right} id="b" />
        <Handle type="source" position={Position.Right} id="b" />
        <Handle type="target" position={Position.Left} id="d" />
        <Handle type="source" position={Position.Left} id="d" />
      </div>
    </>
  );
}
