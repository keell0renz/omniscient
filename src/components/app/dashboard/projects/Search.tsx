"use client";

import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";

export default function ProjectsSearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchQuery = searchParams.get("q");

  const debouncedSetQuery = useDebounceCallback((query) => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="h-fit w-full relative flex flex-row items-center">
      <Input
        className="w-full bg-background-secondary h-10 focus-visible:ring-0 focus-visible:border-sky-100"
        defaultValue={searchQuery || undefined}
        onChange={(e) => {
          debouncedSetQuery(e.target.value);
        }}
      />
    </div>
  );
}
