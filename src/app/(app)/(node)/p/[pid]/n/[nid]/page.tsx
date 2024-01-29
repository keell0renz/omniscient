import { handler } from "@/server/openai";

export const runtime = "edge";

export default async function Page({
  params,
}: {
  params: { pid: string; nid: string };
}) {
  
  return (
    <></>
  )
}
