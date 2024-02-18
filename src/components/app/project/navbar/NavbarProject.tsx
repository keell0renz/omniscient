"use client"

import { useProject } from "@/hooks/projects";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function NavbarProject() {
    const params = useParams<{ id: string }>()
    const { data, error, isLoading } = useProject(params.id)

    if (isLoading || error) return (
        <Skeleton className="w-20 h-4 my-auto" />
    )

    return (
        <p className="mt-1">
            {data?.title}
        </p>
    )
}