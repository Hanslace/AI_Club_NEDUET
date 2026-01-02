import {ProjectCard} from "@/components"
import Link from "next/link"

type Project = {
  id: string
  title: string
  slug: string
  excerpt: string
  featuredImage: {
    url: string
    alt?: string
  }
}

async function getProjects(): Promise<Project[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects?depth=1&limit=3`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CMS_READ_TOKEN}`,
      },
      cache: "no-store",
    }
  )

  if (!res.ok) throw new Error("Failed to fetch projects")

  const data = await res.json()
  return data.docs
}


export default async function ProjectsSection() {
  const projects = await getProjects()

  return (
    <section
      id="projects"
      className="relative w-full min-h-[879px] bg-background flex flex-col items-center py-[5rem] px-[2rem] md:px-[6rem]"
    >
      {/* Header */}
      <div className="text-center mb-[3rem]">
        <h2 className="font-heading text-primary1 text-[clamp(24px,3vw,36px)] font-bold uppercase">
          Our Projects
        </h2>
        <p className="text-secondary1 max-w-[800px] mx-auto">
          We work on ambitious projects solutions and enhance the standards of living through technology.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[4rem] justify-items-center">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            imageUrl={project.featuredImage.url}
            title={project.title}
            slug={project.slug}
            description={project.excerpt}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-[3rem]">
        <Link
          href="/projects"
          className="group flex items-center gap-3 uppercase font-space-grotesk font-bold text-primary1 text-[24px] hover:text-primary1"
        >
          Explore More Projects
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-5 group-hover:translate-x-1.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-5-5m5 5l-5 5" />
          </svg>
        </Link>
      </div>
    </section>
  )
}