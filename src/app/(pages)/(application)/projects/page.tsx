import React from 'react';
import ProjectCard from '@/components/application/projects/ProjectCard';
import { getProjectsByUser } from '@/server/project';
import { Input } from '@/components/ui/input';
import AddNewProject from '@/components/application/projects/NewProject';

export default async function Page() {
    const projects = await getProjectsByUser();

    return (
        <>
            <div className="w-full h-[40px] flex flex-row flex-nowrap gap-2">
                <Input className="h-full w-full bg-secondary" />
                <AddNewProject />
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3 my-10">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))
                ) : (
                    <div className="col-span-3 flex items-center justify-center text-2xl">
                        <p>No projects available</p>
                    </div>
                )}
            </div>
        </>
    );
}
