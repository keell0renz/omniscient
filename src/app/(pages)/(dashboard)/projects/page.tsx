import { AddNewProject } from "@/components/dashboard/buttons";
import { ProjectPanel } from "@/components/project/panel/dashboard";
import { PanelSkeleton } from "@/components/project/panel";
import { Suspense } from "react";
import ProjectSearch from "@/components/project/ProjectSearch";

export default function Page({
  searchParams,
}: {
  searchParams?: { q?: string; p?: number };
}) {
  return (
    <>
      <div className="flex justify-between items-center mb-6 h-12 mx-2">
        <div className="flex w-full gap-2 h-fit">
          <ProjectSearch />
          <AddNewProject />
        </div>
      </div>
      <Suspense fallback={<PanelSkeleton />}>
        <ProjectPanel query={searchParams?.q} currentPage={searchParams?.p} />
      </Suspense>
    </>
  );
};