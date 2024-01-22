import { Input } from "@/components/ui/input";
import { AddNewProject } from "@/components/dashboard/buttons";
import { ProjectPanel } from "@/components/project/panel/dashboard";
import { PanelSkeleton } from "@/components/project/panel";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <div className="flex justify-between mb-6">
        <div className="flex w-full gap-2">
          <Input
            className="block w-full px-4 py-1 leading-tight focus:outline-none bg-secondary/25 h-10 "
            placeholder="Search your projects..."
          />
          <AddNewProject />
        </div>
      </div>
      <Suspense fallback={<PanelSkeleton />}>
        <ProjectPanel />
      </Suspense>
    </>
  );
}
