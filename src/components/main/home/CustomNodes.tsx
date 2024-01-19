import { Handle, Position, NodeProps } from "reactflow";
import { Info } from "lucide-react";

type CustomNodeData = {
  label: string;
  description: string;
};

function InfoHoverCard(props: NodeProps<CustomNodeData>) {
  return (
    <>
      <p>{`${props.data.label}`}</p>
      <div className="mt-1.5">
        <Info size={16} />
      </div>
    </>
  );
}

export default function CustomNode(props: NodeProps<CustomNodeData>) {
  return (
    <>
      <div className="flex flex-col rounded-2xl bg-background/70 border w-60 h-28">
        <div className="w-full h-10 border-b bg-background rounded-t-2xl pl-3 pt-2 font-semibold flex flex-row gap-2 justify-start text-foreground/80 hover:text-foreground">
          <InfoHoverCard {...props} />
        </div>
        <div className="pl-3 p-2 text-sm text-foreground/80">
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
