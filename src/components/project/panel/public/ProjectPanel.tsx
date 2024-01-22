import { getPublicProjects } from "@/server/project";
import { PublicProject as ProjectCard } from "../../cards";

interface ProjectPanelProps {
  query?: string
  currentPage?: number
}

export default async function ProjectPanel(props: ProjectPanelProps) {
  const projects = await getPublicProjects();

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
