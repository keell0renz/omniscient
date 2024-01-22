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

export default async function Project({ project }: { project: Project }) {
  const user = await clerkClient.users.getUser(project.user_id);

  return (
    <Card className="w-full flex flex-col justify-between hover:border-primary cursor-pointer">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          <div className="text-lg">
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
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-row justify-between">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>
              {user.firstName &&
                user.lastName &&
                `${user.firstName[0]} ${user.lastName[0]}`}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm ml-2">
            by @
            {user.username
              ? user.username
              : `${user.firstName} ${user.lastName}`}
          </p>
        </div>
        <Button asChild>
          <Link href={`/p/${project.id}`}>Open</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
