"use client";

import { useUserProjects } from "@/hooks/projects";
import { ProjectCard, ProjectCardSkeleton } from "./ProjectCard";
import { useSearchParams } from "next/navigation";

export default function Projects({ className }: { className?: string }) {
  const params = useSearchParams();
  const { data, isLoading, isValidating, size, setSize } = useUserProjects(
    params.get("q") || undefined,
  );

  if (isLoading)
    return (
      <section
        className={`grid sm:grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3 ${className}`}
      >
        {[...Array(9)].map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </section>
    );

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
