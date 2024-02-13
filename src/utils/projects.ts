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
) => {
    if (previousPageData && !previousPageData.length) return null;
    return `public_projects_page:${pageIndex}`;
};
