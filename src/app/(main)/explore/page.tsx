import { ExploreSearch } from "@/components/project/panel/public";
import { ProjectPanel } from "@/components/project/panel/public";
import { PanelSkeleton } from "@/components/project/panel";
import { Suspense } from "react";

export default function Page({
  searchParams,
}: {
  searchParams?: { q?: string; p?: number };
}) {
  return (
    <>
      <div className="home overflow-hidden h-fit bg-transparent mx-auto box-border max-w-10xl w-full -mt-10 flex flex-col">
        <ExploreSearch />
      </div>
      <div className={searchParams?.q ? "mt-10" : "mt-32"}>
        <Suspense fallback={<PanelSkeleton />}>
          <ProjectPanel query={searchParams?.q} currentPage={searchParams?.p} />
        </Suspense>
      </div>
    </>
  );
}
