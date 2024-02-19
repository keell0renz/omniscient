"use client";

import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";

export default function ExploreSearchInput() {
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
    <div className="h-fit w-full max-w-[1000px] relative flex flex-row items-center">
      <Input
        className="rounded-full bg-gray-100 text-black h-12 text-md p-6 focus-visible:ring-0"
        defaultValue={searchQuery || undefined}
        placeholder="What do you want to find?"
        onChange={(e) => {
          debouncedSetQuery(e.target.value);
        }}
      />
    </div>
  );
}
