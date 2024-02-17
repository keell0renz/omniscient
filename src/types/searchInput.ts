import { z } from "zod";
import { validateSearchInput } from "@/schema/searchInput";

export type SearchInputType = z.infer<typeof validateSearchInput>;