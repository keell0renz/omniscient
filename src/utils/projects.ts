import { Project } from "@/types/projects";

export function getUserProjectsKey(
    query?: string,
): (
    pageIndex: number,
    previousPageData: Project[] | null,
) => { key: string; query: string | undefined; page: number } | null {
    const getKey = (pageIndex: number, previousPageData: Project[] | null) => {
        if (previousPageData && !previousPageData.length) return null;

        return { key: "user_projects", query: query, page: pageIndex };
    };

    return getKey;
}

export function getPublicProjectsKey(
    query?: string,
): (
    pageIndex: number,
    previousPageData: Project[] | null,
) => { key: string; query: string | undefined; page: number } | null {
    const getKey = (pageIndex: number, previousPageData: Project[] | null) => {
        if (previousPageData && !previousPageData.length) return null;

        return { key: "public_projects", query: query, page: pageIndex };
    };

    return getKey;
}
