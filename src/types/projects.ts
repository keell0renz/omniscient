import { z } from "zod";
import { Project as ProjectSchema } from "@prisma/client";
import { validateCreateProject, validateSetAIContext } from "@/schema/projects";

export type CreateProject = z.infer<typeof validateCreateProject>;

export type EditProject = CreateProject;

export type SetAIContext = z.infer<typeof validateSetAIContext>

export type ProjectPanelCard = ProjectSchema & { parent_user_id?: string }

export type PublicProjectCard = ProjectSchema

export type Project = ProjectSchema