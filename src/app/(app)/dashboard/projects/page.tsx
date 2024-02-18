import dynamic from "next/dynamic";
import { Search } from "@/components/app/dashboard/projects";

const AddNew = dynamic(
  () => import("@/components/app/dashboard/projects/new/AddProject"),
  {
    ssr: false,
  },
);

const Projects = dynamic(
  () => import("@/components/app/dashboard/projects/Projects"),
  {
    ssr: false,
  },
);

export default function Page() {
  return (
    <>
      <section className="flex w-full h-fit space-x-2 pt-6">
        <Search />
        <AddNew />
      </section>

      <Projects className="pt-8" />
    </>
  );
}
