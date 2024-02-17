"use client"
import { useUserProjects } from "@/hooks/projects";
import ProjectCard from "@/components/dashboard/projects/ProjectCard";
import ProjectsSkeletonPanel from "@/components/dashboard/projects/ProjectSkeletonPanel";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

type ProjectsPanelProps = {
    query?: string,
}

export default function ProjectsPanel({ query }: ProjectsPanelProps) {
    const { data, error, isFetching } = useUserProjects(query); // projects are in the data[0]

    if (error) console.error(error); // should to handle this after fix back

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