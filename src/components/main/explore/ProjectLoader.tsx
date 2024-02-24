"use client";
import { motion } from "framer-motion";
import { LoaderIcon } from "lucide-react";

interface ProjectLoaderProps {
  hasNextPage: boolean,
  data: any,
  fetchNextPage: () => void;
}

export default function ProjectLoader({
  hasNextPage,
  data,
  fetchNextPage,
}: ProjectLoaderProps) {
  function handleView() {
    fetchNextPage();
    return;
  }

  if (!hasNextPage) {
    return (
      <div className="flex flex-col items-center justify-center col-span-full my-10 gap-4">
        {data.pages[1][0] && (
          <>
            <h2 className="text-center text-muted-foreground font-normal font-mono w-fit h-fit mx-auto col-span-full">
              You&apos;ve reached the end of public projects.
            </h2>
          </>
        )}
      </div>
    );
  }

  return (
    <motion.div
      className="inline-flex text-foreground gap-2 w-fit h-fit mt-40 py-10 mx-auto col-span-full"
      onViewportEnter={handleView}
    >
      <span>
        <LoaderIcon className="animate-spin" />
      </span>
    </motion.div>
  );
}