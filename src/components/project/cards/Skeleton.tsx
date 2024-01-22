import { Skeleton } from "@/components/ui/skeleton";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
  Card,
} from "@/components/ui/card";

export default function ProjectSkeleton() {
  return (
    <Card className="w-full flex flex-col justify-between hover:border-primary cursor-pointer">
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
      <CardFooter className="flex flex-row justify-between">
        <div className="flex items-center">
          <Skeleton className="w-10 h-10 rounded-full" />
          <p className="text-sm ml-2">
            <Skeleton className="w-24 h-3" />
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
