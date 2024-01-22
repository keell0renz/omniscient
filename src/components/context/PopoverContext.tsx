import { Dispatch, SetStateAction, createContext } from "react";
import { Project } from "@prisma/client";

export const PopoverContext = createContext<{
  setOpenPopover?: Dispatch<SetStateAction<boolean>>;
  project: Project;
}>({ project: {} as Project });
