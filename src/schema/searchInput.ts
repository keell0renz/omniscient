import { z } from "zod";

export const validateSearchInput = z.object({
    input: z.string().max(64, "Input is too long!"),
});