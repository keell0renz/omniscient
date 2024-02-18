import { useProject } from "@/hooks/projects";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function NavbarProject() {
    const params = useSearchParams()
    const { data, error, isLoading } = useProject(params.get("q") as string)

    if (isLoading || error) return (
        <Skeleton className="w-20 h-4 my-auto" />
    )

    return (
        <p className="mt-1">
            {data?.title}
        </p>
    )
}