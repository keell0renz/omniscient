import { Project } from "@prisma/client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { clerkClient } from "@clerk/nextjs";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import CardPopover from "./popover/CardPopover";
import { Button } from "@/components/ui/button";

export default async function Project({ project }: { project: (Project & { parent_user_id?: string }) }) {
  const parent_user = project.parent_user_id? await clerkClient.users.getUser(project.parent_user_id) : null;

  return (
    <Card className="w-full flex flex-col justify-between hover:border-primary cursor-pointer">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          <div className="text-xl">
            {project.title}
            {project.public && (
              <span>
                <Badge className="ml-2 bg-blue-700 text-white truncate">
                  Public
                </Badge>
              </span>
            )}
          </div>
          <CardPopover project={project} />
        </CardTitle>
        <CardDescription className="truncate-2-lines">{project.description}</CardDescription>
      </CardHeader>
      <CardFooter className={parent_user ? "flex flex-row justify-between" : "flex flex-row justify-end"}>
        {parent_user && (
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src={parent_user.imageUrl} />
              <AvatarFallback>
                {parent_user.firstName &&
                  parent_user.lastName &&
                  `${parent_user.firstName[0]}${parent_user.lastName[0]}`}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm ml-2">
              by @
              {parent_user.username
                ? parent_user.username
                : `${parent_user.firstName} ${parent_user.lastName}`}
            </p>
          </div>
        )}
        <Button asChild>
          <Link href={`/p/${project.id}`}>Open</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
