import { z } from "zod";

export const validateSetNodeAIContext = z.object({
    ai_context: z
        .string()
        .max(4096, "AI context too long!"),
});
