import dynamic from "next/dynamic";
import { Search } from "@/components/main/explore";

const Projects = dynamic(() => import("@/components/main/explore/Projects"), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <section className="flex w-full h-fit justify-center">
        <Search />
      </section>

      <Projects className="mt-24" />
    </>
  );
}
