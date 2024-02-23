"use client";

import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchProjectsByUser } from "@/server/projects";

interface useUserProjectsOptions {
    toastOnError: boolean;
}

const useUserProjectsDefaultOptions = {
    toastOnError: true,
} satisfies useUserProjectsOptions;

export default function useUserProjects(
    query: string | undefined,
    options: useUserProjectsOptions = useUserProjectsDefaultOptions,
) {
    const { toast } = useToast();
    const { data, error, fetchNextPage, hasNextPage, isLoading, isFetching } =
        useInfiniteQuery({
            queryKey: ["user_projects", query],
            queryFn: async ({ pageParam }) =>
                searchProjectsByUser(query, pageParam),
            initialPageParam: 0,
            getNextPageParam: (lastPage, allPages, lastPageParam) => {
                if (lastPage.length === 0) {
                    return undefined;
                }
                return lastPageParam + 1;
            },
            getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
                if (firstPageParam <= 1) {
                    return undefined;
                }
                return firstPageParam - 1;
            },
            refetchOnWindowFocus: false,
        });

    useEffect(() => {
        if (error && options.toastOnError) {
            toast({
                title: error.name,
                description: error.message,
                className: "bg-destructive text-destructive-foreground",
            });
        }
    }, [error, options.toastOnError]);

    return {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetching,
    };
}
