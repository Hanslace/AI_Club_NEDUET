"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";

interface Card4Props {
  imageName: string;
  name: string;
  role: string;
  description?: string;
  linkedinUrl?: string;
}

export default function Card4({
  imageName,
  name,
  role,
  description,
  linkedinUrl,
}: Card4Props) {
  const imageSrc = `/images/${imageName}`;

  return (
    <div className="group relative w-[301px] h-[400px] border border-[#D9D9D9] rounded-[10px_25px_25px_25px] overflow-hidden transition-all duration-500 hover:shadow-lg">
      {/* 🖼️ Profile Picture */}
      <div className="relative w-full h-[306px] overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          width={476}
          height={317}
          className="absolute top-0 left-0 h-[317px] w-[476px] object-cover rounded-[10px_25px_25px_25px] transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* 🟧 Orange Overlay (swipe up effect) */}
      <div className="absolute inset-0 bg-primary2 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-[10px_25px_25px_25px]"></div>

      {/* 🏷️ Name Badge */}
      <div className="absolute left-[16px] top-[320px] border-2 border-primary2 group-hover:border-white rounded-[20px] px-4 py-[2px] z-10 transition-colors duration-300">
        <p className="font-space-grotesk text-[16px] font-medium text-primary2 group-hover:text-white tracking-tight">
          {name}
        </p>
      </div>

      {/* 💼 Role */}
      <p className="absolute left-[19px] top-[354px] font-poppins text-[16px] text-secondary1 group-hover:text-secondary2 leading-[24px] tracking-tight z-10 transition-colors duration-300">
        {role}
      </p>

      {/* 💬 Description (visible only after swipe) */}
      {description && (
        <p className="absolute left-1/2 -translate-x-1/2 top-[86px] w-[243px] font-poppins text-[16px] text-secondary2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-center leading-[24px]">
          {description}
        </p>
      )}

      {/* 🔗 LinkedIn Icon */}
      {linkedinUrl && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[22px] top-[22px] w-[40px] h-[40px] rounded-full border-[4px] border-secondary2 flex items-center justify-center text-secondary2 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"
        >
          <Linkedin size={22} className="text-white" />
        </a>
      )}
    </div>
  );
}
