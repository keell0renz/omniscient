"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@react-hook/debounce";
import { useRouter } from "next/navigation";

export default function ProjectsSearchInput({ query }: { query?: string }) {

  return (
    <div className="h-fit w-full relative flex flex-row items-center">
        <Input 
            className="w-full bg-secondary/25 h-10 focus-visible:ring-0 focus-visible:border-sky-100"
        />
    </div>
  );
}
