import ExploreSearch from "@/components/main/explore/ExploreSearch";
import { Suspense } from "react";
import ExploreProjectsPanel from "@/components/main/explore/projects/ExploreProjectsPanel";

type ExplorePageProps = {
    searchParams: { q?: string }, // Page search query
}

export default function Page({ searchParams }: ExplorePageProps) {
    return (
        <>
            <div className="text-center mb-10">
                <h1 className="text-5xl font-semibold">Explore Courses</h1>
                <h2 className="text-2xl font-normal mt-4 text-muted-foreground">Fing a learning experience that fits you</h2>
            </div>

            <ExploreSearch query={searchParams.q} />

            <div className="my-32">
                <ExploreProjectsPanel query={searchParams.q} />
            </div>
        </>
    );
}