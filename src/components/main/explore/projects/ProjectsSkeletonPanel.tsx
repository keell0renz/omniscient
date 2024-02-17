import { Skeleton } from "@/components/ui/skeleton";
import {
    CardTitle,
    CardHeader,
    CardFooter,
    Card,
} from "@/components/ui/card";

type ProjectsSkeletonPanelProps = {
    count?: number,
}

export default async function ProjectsSkeletonPanel({ count }: ProjectsSkeletonPanelProps) {
    count = Number(count) || 6; // default count of Project Skeleton

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
            {Array.from({ length: count }, (_, index) => (
                <ProjectSkeleton key={index} />
            ))}
        </div>
    );
}

function ProjectSkeleton() {
    return (
        <Card className="w-full h-52 flex flex-col justify-between hover:bg-background/40 cursor-pointer">
            <CardHeader>
                <CardTitle className="flex flex-row justify-between text-lg">
                    <Skeleton className="w-64 h-4" />
                </CardTitle>
                <div className="flex flex-col space-y-1 justify-start pt-0.5">
                    <Skeleton className="w-52 h-3" />
                    <Skeleton className="w-52 h-3" />
                </div>
            </CardHeader>
            <CardFooter className="flex flex-row justify-between">
                <div className="flex items-center">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="w-24 h-3 ml-2" />
                </div>
            </CardFooter>
        </Card>
    );
}
