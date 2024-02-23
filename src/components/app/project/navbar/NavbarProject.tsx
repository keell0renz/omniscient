"use client";

import { useProject } from "@/hooks/projects";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function NavbarProject() {
  const { data, error, isLoading } = useProject();

  if (isLoading) return <Skeleton className="w-64 h-4 my-auto" />;

  if (error) return <Skeleton className="w-64 h-4 my-auto bg-destructive" />;

  return (
    <div className="mt-1 flex flex-row justify-start items-center gap-2">
      <p>{data?.title}</p>
      {data?.public && <Badge className="bg-blue-600 text-white">Public</Badge>}
    </div>
  );
}
