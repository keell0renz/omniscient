import { z } from "zod";
import { validateSetNodeAIContext } from "@/schema/AiContext";

export type NodeAIContext = z.infer<typeof validateSetNodeAIContext>;