import { getProjectsByUser } from "@/server/project";
import { Input } from "@/components/ui/input";
import { AddNewProject } from "@/components/dashboard/buttons";
import { Project as ProjectCard } from "@/components/project/cards";

export default async function Page() {
  const projects = await getProjectsByUser();

  return (
    <>
      <div className="flex justify-between mb-6">
        <div className="flex w-full gap-2">
          <Input
            className="block w-full px-4 py-1 leading-tight focus:outline-none bg-secondary/25 h-10 "
            placeholder="Search your projects..."
          />
          <AddNewProject />
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
