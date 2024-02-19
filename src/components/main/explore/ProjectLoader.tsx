"use client";
import { motion } from "framer-motion";
import type { PublicProjectCard } from "@/types/projects";
import { LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectLoaderProps {
  size: number;
  setSize: (
    size: number | ((size: number) => number),
  ) => Promise<PublicProjectCard[][] | undefined>;
  data: any;
}

export default function ProjectLoader({
  size,
  setSize,
  data,
}: ProjectLoaderProps) {
  function handleView() {
    setSize(size + 1);
    return;
  }

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (data && data[0].length < 9) return;

  if (data && data[data.length - 1][0] === undefined) {
    return (
      <div className="flex flex-col items-center justify-center col-span-full my-10 gap-4">
        {data[1] && (
          <>
            <h2 className="text-center text-muted-foreground font-normal font-mono w-fit h-fit mx-auto col-span-full">
              You&apos;ve reached the end of public projects.
            </h2>
            <Button onClick={() => scrollTop()}>Add new +</Button>
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