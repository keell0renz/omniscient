import { getProjectsByUser } from "@/server/project";
import { Project as ProjectCard } from "@/components/project/cards";

export default async function ProjectPanel() {
  const projects = await getProjectsByUser();

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
