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
            <Skeleton className="w-16" />
          </div>
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-24" />
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-row justify-between">
        <div className="flex items-center">
          <Skeleton className="w-16 h-16 rounded-full" />
          <p className="text-sm ml-2">
            <Skeleton className="w-10" />
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
