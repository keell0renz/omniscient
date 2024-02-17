import { Project } from "@/types/projects";
import {
    CardTitle,
    CardDescription,
    CardHeader,
    Card,
} from "@/components/ui/card";
import Link from "next/link";

export default async function ProjectCard({ project }: { project: Project }) {
    return (
        <Link href={`/p/${project.id}`}>
            <Card className="w-full min-h-52 h-52 flex flex-col justify-between hover:border-primary cursor-pointer">
                <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="truncate-2-lines">
                        {project.description}
                    </CardDescription>
                </CardHeader>
            </Card>
        </Link>
    );
}