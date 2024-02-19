"use client";
import { LoaderIcon } from "lucide-react";
import { motion } from "framer-motion";
import type { ProjectPanelCard } from "@/types/projects";

interface ProjectLoaderProps {
  size: number;
  setSize: (
    size: number | ((size: number) => number),
  ) => Promise<ProjectPanelCard[][] | undefined>;
}

export default function ProjectLoader({ size, setSize }: ProjectLoaderProps) {
  function handleView() {
    setSize(size + 1);
    return;
  }

  return (
    <motion.div
      className="inline-flex text-foreground gap-2 w-fit h-fit py-10 mx-auto col-span-full"
      onViewportEnter={handleView}
    >
      <span>
        <LoaderIcon className="animate-spin" />
      </span>
      <div>Loading...</div>
    </motion.div>
  );
}
