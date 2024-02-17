import dynamic from "next/dynamic";
import { Search } from "@/components/dashboard/projects";

const AddNew = dynamic(
  () => import("@/components/dashboard/projects/controls/NewPopover"),
  {
    ssr: false,
  },
);

const Projects = dynamic(
  () => import("@/components/dashboard/projects/Projects"),
  {
    ssr: false,
  },
);

export default function Page({ params }: { params: { q?: string } }) {
  return (
    <>
      <section className="flex w-full h-fit space-x-2 pt-8">
        <Search />
        <AddNew />
      </section>

      <Projects className="pt-8" />
    </>
  );
}
