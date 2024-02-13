import { z } from "zod";
import { Project as ProjectSchema } from "@prisma/client";
import { validateCreateProject, validateEditProject } from "@/schema/projects";

export type CreateProject = z.infer<typeof validateCreateProject>;

export type EditProject = z.infer<typeof validateEditProject>;

export type ProjectPanelCard = ProjectSchema & { parent_user_id?: string };

export type PublicProjectCard = ProjectSchema;

export type Project = ProjectSchema;
