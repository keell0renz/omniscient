"use client";
import { Project } from "@prisma/client";
import { importPublicProject } from "@/server/project";
import { useState } from "react";
import LoadingButton from "@/components/application/LoadingButton";

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
