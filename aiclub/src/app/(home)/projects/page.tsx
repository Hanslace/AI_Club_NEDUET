import { Breadcrumb,ProjectCard } from "@/components";
import Link from "next/link";

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

type ProjectsResponse = {
  docs: Project[]

}

async function getProjects( limit: number): Promise<ProjectsResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects?depth=1&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CMS_READ_TOKEN}`,
      },
      cache: "no-store",
    }
  )

  if (!res.ok) throw new Error("Failed to fetch projects")

  return res.json()
}


export default async function Projects({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string }
}) {
  const limit = Number(searchParams.limit ?? 6)

  const { docs } = await getProjects(limit)

  return (
    <div className="py-[4rem] px-[10vw]">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Projects" },
        ]}
      />

      <div className="text-left mb-[3rem] max-w-[800px]">
        <h2 className="font-heading text-primary1 text-[clamp(36px,3vw,48px)] font-bold uppercase">
          Our Projects
        </h2>
        <p className="text-secondary1 text-[clamp(12px,3vw,24px)]">
          We work on ambitious projects solutions and enhance the standards of living through technology.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[4rem] justify-items-center">
        {docs.map(project => (
          <ProjectCard
            key={project.id}
            imageUrl={project.featuredImage.url}
            title={project.title}
            slug={project.slug}
            description={project.excerpt}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-4 mt-[4rem] justify-center">
        {limit === 6 && (
          <Link
            href={`/projects?limit=100`}
            scroll={false}
            prefetch
            className="font-bold text-primary1 uppercase"
          >
            Show All Projects →
          </Link>
        )}
      </div>

    </div>
  )
}