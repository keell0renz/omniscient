import AIChat from "@/components/node/chat/AIChat";

export const runtime = "edge";

export default function Page({
  params,
}: {
  params: { pid: string; nid: string };
}) {
  return (
    <>
      <AIChat />
    </>
  );
}
