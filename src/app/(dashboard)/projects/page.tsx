import { Suspense } from "react";
import ProjectsPanel from "@/components/dashboard/projects/ProjectsPanel";
import ProjectsControls from "@/components/dashboard/projects/controls/ProjectsControls";
import ProjectsSkeletonPanel from "@/components/dashboard/projects/ProjectSkeletonPanel";

type ExplorePageProps = {
    searchParams: { q?: string }, // Page search query
}

export default function Page({ searchParams }: ExplorePageProps) {
    return (
        <>
            <div className="w-full flex flex-row justify-between md:px-20 mt-6">
                <ProjectsControls />
            </div>

            <div className="my-32">
                <Suspense fallback={<ProjectsSkeletonPanel />}>
                    <ProjectsPanel query={searchParams.q} />
                </Suspense>
            </div>
        </>
    );
}