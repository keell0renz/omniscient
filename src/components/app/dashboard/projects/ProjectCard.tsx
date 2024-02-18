"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
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
import Hint from "./Hint";

export function ProjectCardSkeleton() {
  return (
    <Card className="w-full h-48 flex flex-col justify-between hover:border-primary cursor-pointer">
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/p/${project.id}`} className="group">
      <Card
        className="w-full h-48 flex flex-col justify-between hover:border-primary cursor-pointer relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader>
          <CardTitle className="text-xl truncate">{project.title}</CardTitle>
          <CardDescription className="truncate-2-lines">
            {project.description}
          </CardDescription>
        </CardHeader>
        {project.parent_user_id ? (
          <CardFooter className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center">
              <Avatar className="w-10 h-10">
                <AvatarFallback></AvatarFallback>
                <AvatarImage src={project.parent_avatar_url} />
              </Avatar>
              <Link
                href="#"
                className="text-sm ml-2 hover:underline hover:underline-offset-4"
              >
                by @{project.parent_username}
              </Link>
            </div>
            <AnimatePresence>{isHovered && <Hint />}</AnimatePresence>
          </CardFooter>
        ) : (
          <CardFooter className="flex flex-row justify-end items-center">
            <AnimatePresence>{isHovered && <Hint />}</AnimatePresence>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
