import { getProjectsByUser } from "@/server/project";
import { Project as ProjectCard } from "@/components/project/cards";
import { Project } from "@prisma/client";

interface ProjectPanelProps {
  query?: string;
  currentPage?: number;
}

export default async function ProjectPanel(props: ProjectPanelProps) {
  let projects;
  projects = await getProjectsByUser();

  function searchProjectsByUser(query: string, projects: Project[]) {
    return projects.filter(
      project =>
        project.title
          .toLowerCase()
          .includes(query.toLowerCase())
        ||
        project.description
          .toLowerCase()
          .includes(query.toLowerCase())
    )
  }

  const query = props.query || "";

  if (query) {
    projects = searchProjectsByUser(query, projects)
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
