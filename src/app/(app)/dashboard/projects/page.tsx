import dynamic from "next/dynamic";

const Projects = dynamic(() => import("@/components/dashboard/projects/Projects"), {
  ssr: false,
});

export default function Page({ params }: { params: { q?: string }}) {
  return (
    <main>
      <Projects query={params.q}/>
    </main>
  )
}
