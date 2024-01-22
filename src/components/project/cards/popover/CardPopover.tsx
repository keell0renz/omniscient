"use client";

import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";

import { MoreHorizontal } from "lucide-react";
import { Project } from "@prisma/client";
import EditProject from "./EditProject";
import PublishProject from "./PublishProject";
import DeleteProject from "./DeleteProject";
import SetAIContext from "./SetAIContext";
import { useState } from "react";

import { PopoverContext } from "@/components/project/cards/popover/context/PopoverContext";

export default function CardPopover({ project }: { project: Project }) {
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger>
        <MoreHorizontal />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-40 flex flex-col justify-start space-y-2"
        side="bottom"
      >
        <PopoverContext.Provider value={{ setOpenPopover, project }}>
          <PublishProject />
          <EditProject />
          <SetAIContext />
          <DeleteProject />
        </PopoverContext.Provider>
      </PopoverContent>
    </Popover>
  );
}
