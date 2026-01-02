import { Breadcrumb } from "@/components"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { richTextConverters } from "@/lib/richTextConverters"
import { notFound } from "next/navigation"
import type { SerializedEditorState, SerializedLexicalNode } from 'lexical'

type Project = {
  title: string
  slug: string
  content: SerializedEditorState<SerializedLexicalNode>
  tableOfContents: {
    label: string
    anchor: string
    level: number
  }[]
}

async function getProject(slug: string): Promise<Project> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects?where[slug][equals]=${slug}&depth=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CMS_READ_TOKEN}`,
      },
      cache: "no-store",
    }
  )

  if (!res.ok) throw new Error("Failed to fetch project")

  const data = await res.json()

  if (!data.docs?.length) notFound()

  return data.docs[0]
}

export default async function ProjectDetails({
  params,
}: {
  params: { slug: string }
}) {
  const project = await getProject(params.slug)

  return (
    <div className="py-[4rem] px-[10vw]">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
      />


      <div className="mt-[3rem] grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-[4rem]">
        {/* Main Content */}
        <article className="prose prose-lg max-w-none">
          <RichText data={project.content} converters={richTextConverters}/>
        </article>

        {/* Table of Contents */}
        <aside className="sticky top-[10rem] self-start border-l pl-6">
          <h3 className="font-space-grotesk font-bold uppercase text-primary1 mb-4">
            Contents
          </h3>

          <ul className="space-y-2">
            {project.tableOfContents.map(item => {
              const indent = (item.level - 1) * 12
              const size =
                item.level === 1
                  ? 'text-base'
                  : item.level === 2
                  ? 'text-sm'
                  : 'text-xs'

              return (
                <li
                  key={item.anchor}
                  style={{ paddingLeft: indent }}
                  className={size}
                >
                  <a
                    href={`#${item.anchor}`}
                    className="block text-secondary1 hover:text-primary1 transition"
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>

        </aside>
      </div>
    </div>
  )
}
