"use client"
import {
  MCard,
  CardTitle,
  CardDescription,
  CardHeader, CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import { cardFade } from "@/components/animations/framerAnimations";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import ImportProject from "@/components/application/projects/ImportProject";

const ExploreCard = ({ project }: { project: Project, isFromPublicPage?: boolean }) => {
  const { user } = useUser();

  return (
    <MCard
      className="5 w-full h-[200px] flex flex-col justify-between hover:border-primary cursor-pointer"
      initial="hidden"
      whileInView="visible"
      variants={cardFade}
      custom={1.5}
    >
      <CardHeader>
        <CardTitle className="relative truncate flex flex-row justify-between text-2xl">
          <div className="flex justify-between w-full">
            <div className="flex flex-row flex-nowrap gap-2 items-center">
              <p className="max-w-[200px] truncate flex items-center gap-2">
                {project.title}
              </p>
              {project.public && (
                <Badge className="truncate h-[20px]">
                  Public
                </Badge>
              )}
            </div>
          </div>
        </CardTitle>
        <CardDescription className="text-lg truncate-2-lines">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-row justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            {user?.username
              ? <AvatarFallback>{user.username[0]}</AvatarFallback>
              : <Skeleton className="h-full w-full" />
            }
          </Avatar>
          {user?.username
            ? <p className="text-sm">by @{`${user?.username}`}</p>
            : <Skeleton className="h-4 w-[120px]" />
          }
        </div>
        {user &&
          < ImportProject project={project} />
        }
      </CardFooter>
    </MCard>
  );
};

export default ExploreCard;