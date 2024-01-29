import AIChat from "@/components/node/navbar/chat/AIChat";

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
