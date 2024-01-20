"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";

const ExploreSearch = () => {
  const { toast } = useToast();

  const [query, setQuery] = useState(useSearchParams().get("q"));

  const handleClick = () => {
    toast({
      title: "🚀 In development!",
      description:
        "This functionality is currently in development, check out later. 😊",
      className: "bg-blue-600 text-white",
    });
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
        className="flex mt-16 justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <Input
          value={query ? query : ""}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any project you want to.."
          className="bg-foreground text-background rounded-full outline-none focus-visible:outline-none border border-muted-foreground p-5 mx-2 max-w-[600px]"
        />
        <SearchIcon
          className="w-5 h-5 cursor-pointer text-background -translate-x-10"
          onClick={() => handleClick()}
        />
      </form>
      <div className="flex flex-row flex-nowrap justify-center mt-2 gap-2">
        {buttonHardcode.map((button) => (
          <Button
            key={button.id}
            variant="ghost"
            className="w-fit my-2 h-8 rounded-full"
            onClick={() => handleSearchParams(button.title)}
          >
            {button.title}
            <span className="ml-2">
              <ArrowTopRightIcon />
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ExploreSearch;
