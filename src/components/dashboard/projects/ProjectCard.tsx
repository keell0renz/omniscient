"use client";

import { ProjectPanelCard } from "@/types/projects";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export function ProjectCardSkeleton() {
  return (
    <Card className="w-full h-44 flex flex-col justify-between hover:border-primary cursor-pointer">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          <div className="text-lg">
            <Skeleton className="w-64 h-4" />
          </div>
        </CardTitle>
        <CardDescription>
          <div className="flex flex-col space-y-1 justify-start pt-0.5">
            <Skeleton className="w-52 h-3" />
            <Skeleton className="w-52 h-3" />
          </div>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="text-sm ml-2">
          <Skeleton className="w-24 h-3" />
        </div>
      </CardFooter>
    </Card>
  );
}

export function ProjectCard({ project }: { project: ProjectPanelCard }) {
  return (
    <Link href={`/p/${project.id}`}>
      <Card className="w-full h-44 flex flex-col justify-between hover:border-primary cursor-pointer">
        <CardHeader>
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <CardDescription className="truncate-2-lines">
            {project.description}
          </CardDescription>
        </CardHeader>
        {project.parent_user_id && (
          <CardFooter className="flex items-center">
            <Avatar className="w-10 h-10">
              <AvatarFallback></AvatarFallback>
              <AvatarImage src={project.parent_avatar_url} />
            </Avatar>
            <Link className="text-sm ml-2 hover:underline hover:underline-offset-4" href="#">
              <p>by @{project.parent_username}</p>
            </Link>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
