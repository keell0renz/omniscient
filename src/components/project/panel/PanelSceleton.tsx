import ProjectSkeleton from "../cards/Skeleton";

export default async function ProjectPanel() {
    return (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
        <ProjectSkeleton />
        <ProjectSkeleton />
        <ProjectSkeleton />
        <ProjectSkeleton />
        <ProjectSkeleton />
        <ProjectSkeleton />
      </div>
    );
  }
  