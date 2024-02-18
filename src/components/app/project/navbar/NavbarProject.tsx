import { useProject } from "@/hooks/projects";
import { useSearchParams } from "next/navigation";

export default function NavbarProject() {
    const params = useSearchParams()
    const { data, isLoading } = useProject(params.get("q") as string)
}