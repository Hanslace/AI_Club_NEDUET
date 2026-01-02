"use client";

import Image from "next/image";

interface ActivityCardProps {
  imageName: string;
  title: string;
  description: string;
}

export default function ActivityCard({ imageName, title, description }: ActivityCardProps) {
  const imageSrc = `/images/${imageName}`;

  return (
    <div className="relative bg-background border border-secondary2 rounded-[20px] shadow-sm max-w-[560px] min-h-[300px] text-left hover:shadow-[0_0_25px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden">
      
      {/* 🧠 Text Section (with padding to make space for image) */}
      <div className="relative z-10 p-[3rem] pr-[7rem] pt-[2rem]">
        <h2 className="font-heading text-primary2 text-[clamp(22px,2vw,30px)] font-bold uppercase mb-3">
          {title}
        </h2>

        <p className="font-sans text-primary1 text-[clamp(14px,1.2vw,18px)] leading-relaxed">
          {description}
        </p>
      </div>

      {/* 🖼️ Overlay Image at bottom-right */}
      <div className="absolute bottom-0 right-0 pointer-events-none">
        <Image
          src={imageSrc}
          alt={title}
          width={420}
          height={420}
          className="object-contain w-auto h-auto mix-blend-multiply"
        />
      </div>
    </div>
  );
}
