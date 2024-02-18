"use client";

import { useProject } from "@/hooks/projects";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function NavbarProject() {
  const params = useParams<{ id: string }>();
  const { data, error, isLoading } = useProject(params.id);

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-64 h-4 my-auto" />
      ) : (
        <p className="mt-1">{data?.title}</p>
      )}
    </>
  );
}
