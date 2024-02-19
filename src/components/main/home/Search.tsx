"use client"

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
    const router = useRouter()
    const [query, setQuery] = useState<string>()

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const params = new URLSearchParams()

        if (!query) return

        params.set("q", query)

        router.push(`/explore?${params.toString()}`)
    }

  return (
    <form onSubmit={onSubmit}>
      <div className="w-full h-fit relative flex flex-row flex-nowrap items-center">
        <Input
          className="rounded-full bg-gray-100 text-black mt-2 h-12 text-md p-6 focus-visible:ring-0"
          placeholder="What you would like to learn?"
          onChange={(event) => setQuery(event.target.value)}
          autoFocus
        />
        <button type="submit" className="w-fit h-fit">
          <SearchIcon className="w-6 h-6 absolute right-5 top-1/2 -translate-y-2 cursor-pointer text-black" />
        </button>
      </div>
    </form>
  );
}
