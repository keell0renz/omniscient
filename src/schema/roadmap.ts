import { z } from "zod";

export const GraphNodeValidator = z.object({
    label: z
        .string()
        .min(1, "Title is required.")
        .max(64, "Title too long!"),
    about: z
        .string()
        .max(1024, "Description too long!"),
});

export type GraphNodeSchema = z.infer<typeof GraphNodeValidator>;