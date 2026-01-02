"use client";

import Image from "next/image";


interface Card1Props {
  imageName: string;
  title: string;
  subtitle: string;
  description: string;
}

export default function AboutCard({ imageName, title, subtitle, description }: Card1Props) {
  const imageSrc = `/images/${imageName}`;

  return (
    <div className="relative bg-background border border-secondary2 rounded-[20px] shadow-sm max-w-[600px] min-h-[500px] text-left hover:shadow-[0_0_20px_rgba(0,0,0,0.05)] transition-all duration-300 overflow-hidden">
      
      {/* 🧠 Text Section (with padding to make space for image) */}
      <div className="relative z-10 p-[3rem] pt-[2rem] md:pr-[10rem] ">
        <h2 className="font-heading text-primary2 text-[clamp(20px,2vw,28px)] font-bold uppercase mb-2">
          {title}
        </h2>

        <h3 className="font-sans text-primary1 text-[clamp(16px,1.5vw,22px)] font-semibold leading-snug mb-3">
          {subtitle}
        </h3>

        <p className="font-sans text-primary1 text-auto leading-relaxed">
          {description}
        </p>
      </div>

      {/* 🖼️ Overlay Image at bottom-right */}
      <div className="absolute bottom-0 right-0  pointer-events-none">
        <Image
          src={imageSrc}
          alt={title}
          width={240}
          height={240}
          className="object-contain w-max h-auto mix-blend-multiply" 
        />
      </div>
    </div>
  );
}
