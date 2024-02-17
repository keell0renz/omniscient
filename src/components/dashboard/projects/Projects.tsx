"use client";

import { useUserProjects } from "@/hooks/projects";
import { ProjectCard, ProjectCardSkeleton } from "./ProjectCard";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";

function ProjectsSkeleton({ className }: { className?: string }) {
  return (
    <section
      className={`grid sm:grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3 ${className}`}
    >
      {[...Array(9)].map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </section>
  );
}

export default function Projects({ className }: { className?: string }) {
  const params = useSearchParams();
  const { data, error, isLoading, size, setSize, mutate } = useUserProjects(
    params.get("q") || undefined,
  );
  const { toast } = useToast();

  if (error)
    toast({
      title: "Error!",
      description: error,
      className: "bg-destructive text-destructive-foreground",
    });

  if (isLoading) return <ProjectsSkeleton className={className} />;

  const sectionClasses = `grid sm:grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3 ${className}`;

  return (
    <section className={sectionClasses}>
      {data?.map((page) =>
        page?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        )),
      )}
    </section>
  );
}
