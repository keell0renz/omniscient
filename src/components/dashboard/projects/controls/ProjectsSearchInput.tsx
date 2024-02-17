"use client"
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useRouter } from "next/navigation";

type ProjectsSearchInput = {
    query?: string,
}

export default function ProjectsSearchInput({ query }: ProjectsSearchInput) {
    const [searchQuery, setSearchQuery] = useState(query || "");
    const router = useRouter();

    // Debounce callback for handling search input changes
    const debouncedNavigate = useDebounceCallback(
        (searchQuery) => {
            router.replace(`/projects?q=${searchQuery}`);
        },
        700
    );

    const onClear = (event?: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
        // Check if the event is a keyboard event and the key is Escape
        if (event && 'key' in event && event.key !== 'Escape') {
            return;
        }

        event?.preventDefault?.(); // Prevent default action if it's a keyboard event
        router.replace(`/projects`); // Clear search params
        setSearchQuery("")
    };

    useEffect(() => {
        debouncedNavigate(searchQuery);
    }, [searchQuery]);

    return (

        <div className="h-fit w-full relative flex flex-row flex-nowrap items-center mx-1 sm:mx-4">
            <Input
                className="block w-full px-4 py-1 leading-tight focus:outline-none bg-secondary/25 h-10"
                placeholder="Find your project here..."
                onKeyDown={(e) => onClear(e)}
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
            />
            <button onClick={() => debouncedNavigate(searchQuery)} className="w-fit h-fit">
                <SearchIcon className="w-6 h-6 absolute right-3 bottom-2 cursor-pointer text-foreground" />
            </button>
            {searchQuery && (
                <XIcon
                    className="w-6 h-6 absolute right-9 bottom-2 cursor-pointer text-foreground"
                    onClick={(e) => onClear(e)}
                />
            )}
        </div>
    )
}