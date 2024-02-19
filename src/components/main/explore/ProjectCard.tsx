"use client";

import { PublicProjectCard } from "@/types/projects";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
  Card,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useNewProject } from "@/hooks/projects";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import LoadingButton from "@/components/ui/LoadingButton";

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

function ImportDialog({ parent_id }: { parent_id: string }) {
  const { importProject, isMutating } = useNewProject();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex flex-row justify-start items-center">
          Learn <GraduationCap className="ml-1.5 h-5 w-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Import Project</AlertDialogTitle>
          <AlertDialogDescription>
            You will clone the project into your own workspace.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoadingButton
            isLoading={isMutating}
            onClick={() => importProject(parent_id)}
            className="bg-blue-600 hover:bg-blue-500 text-white"
          >
            Import
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function ProjectCard({ project }: { project: PublicProjectCard }) {
  return (
    <Card className="w-full h-48 flex flex-col justify-between hover:border-primary cursor-pointer relative">
      <CardHeader>
        <CardTitle className="text-xl truncate">{project.title}</CardTitle>
        <CardDescription className="truncate-2-lines">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-start items-center">
          <Avatar className="w-10 h-10">
            <AvatarFallback></AvatarFallback>
            <AvatarImage src={project.author_avatar_url} />
          </Avatar>
          <Link
            href="#"
            className="text-sm ml-2 hover:underline hover:underline-offset-4"
          >
            by @{project.author_username}
          </Link>
        </div>
        <ImportDialog parent_id={project.id} />
      </CardFooter>
    </Card>
  );
}
