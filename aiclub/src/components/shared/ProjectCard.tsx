"use client";

import Image from "next/image";
import Link from "next/link"

interface ProjectCardProps {
  imageUrl: string;
  title: string;
  description: string;
  slug: string
}

export default function ProjectCard({ imageUrl, title, description,slug }: ProjectCardProps) {

  return (
    <div className="relative flex flex-col justify-between bg-background border-2 border-secondary2 rounded-[15px] w-full max-w-[407px] min-h-[508px] shadow-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.05)]">
      
      {/* 🖼️ Image Frame */}
      <div className="flex justify-center mt-[23px] px-[25px]">
        <div className="rounded-[10px] overflow-hidden max-w-[357px] max-h-[249px]">
          <Image
            src={imageUrl}
            alt={title}
            width={357}
            height={238}
            className="object-cover"
          />
        </div>
      </div>

      {/* 📄 Text Section */}
      <div className="px-[25px] mt-[20px]">
        <h2 className="font-space-grotesk font-bold text-[28px] uppercase text-primary2 mb-[10px] leading-[28px]">
          {title}
        </h2>
        <p className="font-poppins text-[16px] leading-[24px] text-primary1 max-w-[350px]">
          {description}
        </p>
      </div>

   

        {/* 🔘 Read More Button */}

        <div className="flex items-center gap-2 px-[25px] py-[12px] mb-[10px]">
          <Link
          href={`/projects/${slug}`}
          className="group flex items-center gap-3 uppercase font-space-grotesk font-bold text-primary1 text-[16px] tracking-wide transition-all duration-300 hover:text-[#FF5733]">
                Read More
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-5 transition-transform duration-300 group-hover:translate-x-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m0 0l-5-5m5 5l-5 5"
                />
              </svg>
          </Link>
        </div>

    </div>
  );
}
