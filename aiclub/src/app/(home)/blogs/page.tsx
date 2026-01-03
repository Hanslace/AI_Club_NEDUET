import { Breadcrumb, BlogCard } from "@/components";
import Link from "next/link";

type Category = {
  id: string;
  title: string;
  slug: string;
};

type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: {
    url: string;
  };
  publishedAt?: string;
  categories?: Category[];
  author?: {
    name: string;
    profilePic?: {
      url: string;
    };
  };
};

type BlogsResponse = {
  docs: Blog[];
};

async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/categories?sort=order`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CMS_READ_TOKEN}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.docs;
}


async function getBlogs(
  limit: number,
  category?: string
): Promise<BlogsResponse> {
  const where = category
    ? `&where[categories.slug][equals]=${category}`
    : "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/blogs?depth=2&sort=-publishedAt&limit=${limit}${where}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CMS_READ_TOKEN}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}


export default async function Blogs({
  searchParams,
}: {
  searchParams: Promise<{ limit?: string; category?: string }>;
}) {
  const { limit, category } = await searchParams;

  const limitNumber = Number.isFinite(Number(limit)) ? Number(limit) : 4;

  const [blogsRes, categories] = await Promise.all([
    getBlogs(limitNumber, category),
    getCategories(),
  ]);

  const { docs } = blogsRes;

  return (
    <div className="py-[4rem]">
      <div className="mx-auto w-full max-w-[1400px] px-[10vw]">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blogs" },
          ]}
        />

        {/* Header */}
        <div className="text-left mb-[2rem] max-w-[800px]">
          <h2 className="font-heading text-primary1 text-[clamp(36px,3vw,48px)] font-bold uppercase">
            Recent Blogs
          </h2>
          <p className="text-secondary1 text-[clamp(14px,2vw,18px)]">
            The AI Club brings the young AI startups into spotlight linking them
            with potential investors.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-[3rem]">
          <p className="mb-2 font-space-grotesk font-bold text-primary1 uppercase text-sm">
            Categories
          </p>

          <div className="flex flex-wrap gap-2">
            {/* All */}
            <Link
              href="/blogs"
              className={`px-3 py-1 rounded-full border text-sm transition
                ${
                  !category
                    ? "bg-primary2 text-white border-primary2"
                    : "border-primary2 text-primary2 hover:bg-primary2 hover:text-white"
                }
              `}
            >
              All
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/blogs?category=${cat.slug}`}
                className={`px-3 py-1 rounded-full border text-sm transition
                  ${
                    category === cat.slug
                      ? "bg-primary2 text-white border-primary2"
                      : "border-primary2 text-primary2 hover:bg-primary2 hover:text-white"
                  }
                `}
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[3rem] justify-items-center">
          {docs.map((blog) => (
            <BlogCard
              key={blog.id}
              slug={blog.slug}
              title={blog.title}
              excerpt={blog.excerpt}
              imageUrl={
                blog.featuredImage?.url ?? "/images/placeholder-blog.jpg"
              }
              authorName={blog.author?.name ?? "Unknown"}
              authorImage={
                blog.author?.profilePic?.url ??
                "/images/avatar-placeholder.png"
              }
              publishedAt={
                blog.publishedAt
                  ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : ""
              }
            />
          ))}
        </div>

        {/* Show All */}
        <div className="flex gap-4 mt-[4rem] justify-center">
          {limitNumber === 4 && (
            <Link
              href={
                category
                  ? `/blogs?category=${category}&limit=100`
                  : "/blogs?limit=100"
              }
              scroll={false}
              prefetch
              className="font-bold text-primary1 uppercase"
            >
              Show All Blogs →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}