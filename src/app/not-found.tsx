import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import ErrorAnimation from "@/components/error/ErrorAnimation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="h-screen w-full flex flex-col items-center justify-center bg-background">
      <div className="space-y-6 text-center">
        <ErrorAnimation />
        <h1 className="text-5xl font-bold text-primary">404 Not Found</h1>
        <p className="text-lg text-muted-foreground mx-auto max-w-md">
          Oops! The page you are looking for could not be found.
        </p>
      </div>
      <Link className="mt-8" href="/">
        <Button
          className="h-[50px] w-[120px] rounded-lg shadow-md hover:bg-muted gap-3"
          variant="outline"
        >
          Home
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
      </Link>
    </main>
  );
}
