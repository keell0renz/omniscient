import { Graph } from "@/components/main/home/graph";
import TextAnimation from "@/components/main/home/TextAnimation";

export default function Page() {

  return (
    <div className="flex flex-col">
      <div className="top-0 right-0 absolute mt-20 h-3/4 w-screen">
        <Graph />
      </div>
      <TextAnimation />
    </div>
  );
}
