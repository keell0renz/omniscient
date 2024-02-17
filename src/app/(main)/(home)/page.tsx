import { Graph } from "@/components/main/home/graph";
import HeroText from "@/components/main/home/hero/HeroText";

export default function Page() {
  return (
    <div className="flex flex-col">
      <div className="top-0 right-0 absolute mt-20 h-3/4 w-screen">
        <Graph />
      </div>
      <HeroText />
    </div>
  );
}
