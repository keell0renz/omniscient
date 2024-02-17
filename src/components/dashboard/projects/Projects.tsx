"use client";

import { useUserProjects } from "@/hooks/projects";
import { ProjectCard, ProjectCardSkeleton } from "./ProjectCard";
import { useToast } from "@/components/ui/use-toast";

function ProjectsSkeleton() {
  return (
    <section className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
      {[...Array(9)].map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </section>
  );
}

export default function Projects({ query }: { query?: string }) {
  const { data, error, isLoading } = useUserProjects(query);
  const { toast } = useToast();

  if (error)
    toast({
      title: "Error!",
      description: error,
      className: "bg-destructive text-destructive-foreground",
    });

  if (isLoading) return <ProjectsSkeleton />;

  return (
    <section className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
      {data?.map((page) =>
        page.map((project) => (
          <ProjectCard key={project.id} project={project} />
        )),
      )}
    </section>
  );
}
