import { z } from "zod";

export const validateCreateProject = z.object({
    title: z.string().min(1, "Title is required.").max(96, "Title too long!"),
    description: z
        .string()
        .min(1, "Description is required.")
        .max(1024, "Description too long!"),
});

export const validateEditProject = z.object({
    title: z.string().min(1, "Title is required.").max(96, "Title too long!"),
    description: z
        .string()
        .min(1, "Description is required.")
        .max(1024, "Description too long!"),
    ai_context: z
        .string()
        .min(1, "AI context is required!")
        .max(1024, "AI context too long!"),
    public: z.boolean(),
});
