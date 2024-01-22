"use client";

import { Project } from "@prisma/client";
import { importPublicProject } from "@/server/project";
import LoadingButton from "@/components/ui/LoadingButton";
import { useState } from "react";

export default function ImportProject({ project }: { project: Project }) {
  async function handle() {
    setIsLoading(true);
    await importPublicProject(project.id);
    setIsLoading(false);
  }

  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingButton
      variant="default"
      onClick={handle}
      className="z-[9999]"
      isLoading={isLoading}
    >
      Import
    </LoadingButton>
  );
}
