import { Breadcrumb } from "@/components";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { richTextConverters } from "@/lib/richTextConverters";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { SerializedEditorState, SerializedLexicalNode } from 'lexical'

type Blog = {
  title: string;
  slug: string;
  excerpt: string;
  content: SerializedEditorState<SerializedLexicalNode>;
  publishedAt?: string;
  featuredImage?: {
    url: string;
    alt?: string;
  };
  categories?: { title: string }[];
  author?: {
    name: string;
    profilePic?: {
      url: string;
    };
  };
};

async function getBlog(slug: string): Promise<Blog> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/blogs?where[slug][equals]=${slug}&depth=3`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CMS_READ_TOKEN}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch blog");

  const data = await res.json();
  if (!data.docs?.length) notFound();

  return data.docs[0];
}

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  return (
    <div className="py-[4rem]">
      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">

        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blogs", href: "/blogs" },
            { label: "Details" },
          ]}
        />

        {/* Meta */}
        {blog.publishedAt && (
          <p className="mt-6 text-sm font-poppins text-secondary1 uppercase">
            {new Date(blog.publishedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}

        {/* Content */}
        <article className="mt-[3rem] prose prose-lg max-w-none">
          <RichText data={blog.content} converters={richTextConverters} />
        </article>

        {/* Categories */}
        {blog.categories?.length ? (
          <div className="mt-[3rem] flex flex-wrap gap-2">
            {blog.categories.map((cat) => (
              <span
                key={cat.title}
                className="px-3 py-1 text-sm rounded-full border border-primary2 text-primary2 font-poppins"
              >
                {cat.title}
              </span>
            ))}
          </div>
        ) : null}

        {/* Author Footer */}
        {blog.author && (
          <div className="mt-[4rem] flex flex-col items-center gap-2">
            {blog.author.profilePic && (
              <Image
                src={blog.author.profilePic.url}
                alt={blog.author.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            )}
            <p className="font-space-grotesk font-medium text-primary2">
              {blog.author.name}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
