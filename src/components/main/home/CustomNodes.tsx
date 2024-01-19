import { Handle, Position, NodeProps } from "reactflow";

type CustomNodeData = {
  label: string;
  description: string;
};

export default function CustomNode(props: NodeProps<CustomNodeData>) {
  return (
    <>
      <div className="flex flex-col rounded-2xl bg-background/70 border w-60 h-28">
        <div className="w-full h-10 border-b bg-background rounded-t-2xl pl-3 pt-2 font-semibold text-foreground/80 hover:text-foreground">
          {`${props.data.label}`}
        </div>
        <div className="pl-3 p-2 text-sm text-foreground/80 hover:text-foreground">
          {`${props.data.description}`}
        </div>
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
