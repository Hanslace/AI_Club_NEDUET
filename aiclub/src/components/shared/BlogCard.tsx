"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  imageUrl: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorImage: string;
  publishedAt: string;
  slug: string;
}

export default function BlogCard({
  imageUrl,
  title,
  excerpt,
  authorName,
  authorImage,
  publishedAt,
  slug,
}: BlogCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canHover = window.matchMedia("(hover: hover)").matches;
    if (canHover) return; // desktop → CSS hover only

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0.01,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col justify-between bg-background
        border-2 border-[#D9D9D9] rounded-[25px]
        w-full max-w-[631px] min-h-[629px]
        overflow-hidden transition-all duration-300
        hover:-translate-y-1 hover:border-secondary2
        hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]
        ${active ? "is-active" : ""}
      `}
    >
      {/* 🖼️ Image */}
      <div className="flex justify-center mt-[25px] px-[23px]">
        <div className="rounded-[20px] overflow-hidden max-w-[587px] max-h-[352px]">
          <Image
            src={imageUrl}
            alt={title}
            width={587}
            height={352}
            className="
              object-cover transition-transform duration-500
              group-hover:scale-[1.04]
              group-[.is-active]:scale-[1.04]
            "
          />
        </div>
      </div>

      {/* 📄 Text */}
      <div className="px-[24px] mt-[28px]">
        <h2
          className="
            font-space-grotesk font-medium text-[32px]
            leading-[35px] tracking-[-0.05em] mb-[12px]
            transition-colors duration-300
            group-hover:text-primary2
            group-[.is-active]:text-primary2
          "
        >
          {title}
        </h2>

        <p
          className="
            font-poppins text-[16px] leading-[22px]
            tracking-[-0.05em] text-secondary1
            max-w-[490px]
            transition-opacity duration-300
            group-hover:opacity-100
            group-[.is-active]:opacity-100
          "
        >
          {excerpt}
        </p>
      </div>

      {/* 👤 Author */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-[32px] pb-[28px] mt-auto">
        <div className="flex items-center gap-[12px]">
          <Image
            src={authorImage}
            alt={authorName}
            width={38}
            height={40}
            className="rounded-full object-cover"
          />
          <span
            className="
              font-space-grotesk font-medium text-[18px]
              tracking-[-0.05em]
              text-primary2
            "
          >
            {authorName}
          </span>
        </div>

        <span className="font-poppins text-[16px] tracking-[-0.05em] text-secondary1">
          {publishedAt}
        </span>
      </div>

      {/* Click overlay */}
      <Link
        href={`/blogs/${slug}`}
        className="absolute inset-0 z-10"
        aria-label={title}
      />
    </div>
  );
}
