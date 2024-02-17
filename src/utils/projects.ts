import { Project } from "@/types/projects";

export const getUserProjectsKey = (
    pageIndex: number,
    previousPageData: Project[] | null,
) => {
    if (previousPageData && !previousPageData.length) return null;
    return `user_projects_page:${pageIndex}`;
};

export const getPublicProjectsKey = (
    pageIndex: number,
    previousPageData: Project[] | null,
    query?: string // Add query as an argument
) => {
    // Return null to stop fetching if we've fetched all data
    if (previousPageData && !previousPageData.length) return null;
    // Include the query in the key
    return `public_projects_page:${pageIndex}:${query}`;
};
