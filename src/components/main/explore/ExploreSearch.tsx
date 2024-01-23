"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";

const ExploreSearch = () => {
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

  const handleSearchParams = (params: string) => {
    setQuery(params);
  };

  const buttonHardcode = [
    {
      id: 1,
      title: "Data Science",
    },
    {
      id: 2,
      title: "TypeScript",
    },
    {
      id: 3,
      title: "Python",
    },
    {
      id: 4,
      title: "DevOps",
    },
  ];

  return (
    <div className="flex flex-col">
      <form
        className="flex mt-16 justify-center items-center w-full relative"
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
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
          className="bg-foreground text-background rounded-full outline-none focus-visible:outline-none border border-muted-foreground p-5 mx-2 max-w-[600px]"
        />
        <div className="absolute translate-x-[39vw] sm:translate-x-64 grid grid-cols-2 grid-rows-1 w-12">
          {query && (
            <X
              className="w-5 h-5 cursor-pointer duration-200 ease-in-out transition hover:text-blue-700 hover:scale-125 text-background col-start-1"
              onClick={() => {
                setQuery(null);
                handleClick(null);
              }}
            />
          )}
          <SearchIcon
            className="w-5 h-5 cursor-pointer duration-200 ease-in-out transition hover:text-blue-700 hover:scale-125 text-background col-start-2"
            onClick={() => handleClick()}
          />
        </div>
      </form>
      {!searchQuery && (
        <div className="flex flex-row flex-nowrap overflow-x-auto mx-auto w-full px-2 justify-start sm:justify-center mt-2 gap-2 scrollbar-hide">
          {buttonHardcode.map((button) => (
            <Button
              key={button.id}
              variant="ghost"
              className="w-fit my-2 h-8 rounded-full"
              onClick={() => {
                setQuery(button.title);
                handleClick(button.title);
              }}
            >
              {button.title}
              <span className="ml-2">
                <ArrowTopRightIcon />
              </span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreSearch;