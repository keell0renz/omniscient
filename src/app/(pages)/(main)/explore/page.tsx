import ExploreSearch from "@/components/main/explore/ExploreSearch";
import { ProjectPanel } from "@/components/project/panel/public";
import { PanelSkeleton } from "@/components/project/panel";
import { Suspense } from "react";

export default function Page({ searchParams }: { searchParams?: { query?: string }}) {
  return (
    <>
      <div className="home overflow-hidden h-fit bg-transparent mx-auto box-border max-w-10xl w-full -mt-10 flex flex-col">
        <ExploreSearch />
      </div>
      <div className="mt-32">
      <Suspense fallback={<PanelSkeleton />}>
        <ProjectPanel />
      </Suspense>
      </div>
    </>
  );
};
