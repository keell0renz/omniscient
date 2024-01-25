"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";

const ProjectSearch = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const searchQuery = searchParams.get("q")

    const [query, setQuery] = useState(searchQuery);

    const handleClick = (queryValue: string | null = query) => {
        const params = new URLSearchParams(searchParams);
        if (queryValue) {
            params.set('q', queryValue);
        } else {
            params.delete('q');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleClick();
            }}
            className="w-full flex flex-row-reverse items-center"
        >
            <Input
                value={query ? query : ""}
                autoFocus
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                        setQuery(null);
                        handleClick(null);
                    }
                }}
                placeholder="Search any project you want to.."
                className="block w-full px-4 py-1 leading-tight focus:outline-none bg-secondary/25 h-10"
            />
            <div className="absolute grid grid-cols-2 grid-rows-1 w-12 mr-2">
                {query && (
                    <X
                        className="w-5 h-5 cursor-pointer duration-200 ease-in-out transition hover:text-blue-700 hover:scale-125 text-foreground col-start-1"
                        onClick={() => {
                            setQuery(null);
                            handleClick(null);
                        }}
                    />
                )}
                <SearchIcon
                    className="w-5 h-5 cursor-pointer duration-200 ease-in-out transition hover:text-blue-700 hover:scale-125 text-foreground col-start-2"
                    onClick={() => handleClick()}
                />
            </div>
        </form>
    );
};

export default ProjectSearch;