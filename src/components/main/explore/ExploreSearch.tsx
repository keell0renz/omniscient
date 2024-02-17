"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounceCallback } from 'usehooks-ts';
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";

type ExploreSearchProps = {
    query?: string,
}

export default function ExploreSearch({ query }: ExploreSearchProps) {
    const [searchQuery, setSearchQuery] = useState(query || "")
    const router = useRouter();

    // Debounce callback for handling search input changes
    const debouncedNavigate = useDebounceCallback(
        (searchQuery) => {
            router.replace(`/explore?q=${searchQuery}`);
        },
        700
    );

    const onClear = (event?: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
        // Check if the event is a keyboard event and the key is Escape
        if (event && 'key' in event && event.key !== 'Escape') {
            return;
        }

        event?.preventDefault?.(); // Prevent default action if it's a keyboard event
        router.replace(`/explore`); // Clear search params
        setSearchQuery("")
    };

    React.useEffect(() => {
        debouncedNavigate(searchQuery);
    }, [searchQuery]);

    return (
        <div className="h-fit relative flex flex-row flex-nowrap items-center mx-1 sm:mx-4 lg:mx-auto lg:max-w-[60vw]">
            <Input
                className="rounded-full border border-background text-background bg-foreground mt-2 h-11 text-lg font-semibold pr-16"
                placeholder="Search any project you want to..."
                onKeyDown={(e) => onClear(e)}
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
            />
            <button onClick={() => debouncedNavigate(searchQuery)} className="w-fit h-fit">
                <SearchIcon className="w-6 h-6 absolute right-3 top-1/2 -translate-y-2 cursor-pointer text-background" />
            </button>
            {searchQuery && (
                <XIcon
                    className="w-7 h-7 absolute right-9 top-1/2 -translate-y-2.5 cursor-pointer text-background"
                    onClick={onClear}
                />
            )}
        </div>
    )
}