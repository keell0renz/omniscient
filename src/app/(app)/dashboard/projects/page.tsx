import Projects from "@/components/dashboard/projects/Projects";

export default function Page({ params }: { params: { q?: string }}) {
  return (
    <main>
      <Projects query={params.q}/>
    </main>
  )
}
