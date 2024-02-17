"use client"
import { Project } from "@/types/projects";
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardFooter,
    Card,
} from "@/components/ui/card";
import { Suspense } from "react";
import CardUser from "@/components/main/explore/projects/CardUser";
import { Skeleton } from "@/components/ui/skeleton";
import { ImportProjectDialog } from "./ImportProject";
import { useUser } from "@clerk/nextjs";

export default function ProjectCard({ project }: { project: Project }) {
    const { user } = useUser();
    return (
        <>
            <Card className="w-full min-h-52 h-52 flex flex-col justify-between hover:border-primary cursor-pointer">
                <CardHeader>
                    <CardTitle className="text-xl truncate-2-lines">{project.title}</CardTitle>
                    <CardDescription className="truncate-2-lines">
                        {project.description}
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                    <Suspense fallback={<Skeleton className="h-10 w-10 rounded-full" />}>
                        <CardUser user_id={project.user_id} />
                    </Suspense>
                    {user &&
                        <ImportProjectDialog project_id={project.id} />
                    }
                </CardFooter>
            </Card>
        </>
    );
}