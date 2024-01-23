import { getPublicProjects, searchPublicProjects } from "@/server/project";
import { PublicProject as ProjectCard } from "@/components/project/cards"
import { unstable_noStore as noStore } from "next/cache";

interface ProjectPanelProps {
  query?: string;
  currentPage?: number;
}

export default async function ProjectPanel(props: ProjectPanelProps) {
  let projects;

  if (props.query) {
    noStore();
    projects = await searchPublicProjects(props.query);
  } else {
    projects = await getPublicProjects();
  }

  if (!projects[0]) return (
    <h2 className="text-center mt-[30vh] text-2xl text-muted-foreground">No projects available</h2>
  )

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
