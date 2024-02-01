import { z } from "zod";

export const validateSetChatTitle = z.object({
    title: z
        .string()
        .max(16, "Title is too long!"),
});

export type SetChatTitleSchema = z.infer<typeof validateSetChatTitle>;