"use client"
import { usePublicProjects } from "@/hooks/projects";
import ProjectCard from "./ProjectCard";
import ProjectsSkeletonPanel from "@/components/main/explore/projects/ProjectsSkeletonPanel"
import { useToast } from "@/components/ui/use-toast";

type ExploreProjectsPanelProps = {
    query?: string,
}

export default function ExploreProjectsPanel({ query }: ExploreProjectsPanelProps) {
    const { data, error, isFetching } = usePublicProjects(query); // projects are in the data[0]
    const { toast } = useToast();

    if (error) {
        toast({
            title: "An error occured",
            description: `Error: ${error}`,
        })
    }

    if (isFetching) {
        return (
            <ProjectsSkeletonPanel />
        )
    }

    if (data && data[0]) {
        return (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
                {data[0][0]
                    ? data[0].map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))
                    :
                    <h2 className="text-2xl col-span-full text-center text-muted-foreground">
                        No projects found
                        <span className="ml-2 text-muted-foreground/80">:(</span>
                    </h2>
                }
            </div>
        );
    }
}