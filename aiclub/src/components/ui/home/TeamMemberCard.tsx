"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Linkedin } from "lucide-react";

interface TeamMemberCardProps {
  imageUrl: string;
  name: string;
  role: string;
  description?: string;
  linkedinUrl?: string;
}

export default function TeamMemberCard({
  imageUrl,
  name,
  role,
  description,
  linkedinUrl,
}: TeamMemberCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canHover = window.matchMedia("(hover: hover)").matches;
    if (canHover) return; // desktop / trackpad / mouse → use CSS hover only

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
      className={`group relative w-[301px] h-[400px] border border-[#D9D9D9]
      rounded-[10px_25px_25px_25px] overflow-hidden transition-all duration-500
      hover:shadow-lg ${active ? "is-active" : ""}`}
    >
      {/* 🖼️ Profile Picture */}
      <div className="relative w-full h-[306px] overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          width={476}
          height={317}
          className="
            absolute top-0 left-0 h-[317px] w-[476px] object-cover
            rounded-[10px_25px_25px_25px]
            transition-transform duration-500
            group-hover:scale-105
            group-[.is-active]:scale-105
          "
        />
      </div>

      {/* 🟧 Orange Overlay */}
      <div
        className="
          absolute inset-0 bg-primary2 translate-y-full
          transition-transform duration-500 ease-in-out
          rounded-[10px_25px_25px_25px]
          group-hover:translate-y-0
          group-[.is-active]:translate-y-0
        "
      />

      {/* 🏷️ Name Badge */}
      <div
        className="
          absolute left-[16px] top-[320px] z-10
          border-2 border-primary2 rounded-[20px] px-4 py-[2px]
          transition-colors duration-300
          group-hover:border-white
          group-[.is-active]:border-white
        "
      >
        <p
          className="
            font-space-grotesk text-[16px] font-medium tracking-tight
            text-primary2
            transition-colors duration-300
            group-hover:text-white
            group-[.is-active]:text-white
          "
        >
          {name}
        </p>
      </div>

      {/* 💼 Role */}
      <p
        className="
          absolute left-[19px] top-[354px] z-10
          font-poppins text-[16px] leading-[24px] tracking-tight
          text-secondary1
          transition-colors duration-300
          group-hover:text-secondary2
          group-[.is-active]:text-secondary2
        "
      >
        {role}
      </p>

      {/* 💬 Description */}
      {description && (
        <p
          className="
            absolute left-1/2 -translate-x-1/2 top-[86px] w-[243px] z-10
            font-poppins text-[16px] leading-[24px] text-center
            text-secondary2 opacity-0
            transition-opacity duration-300
            group-hover:opacity-100
            group-[.is-active]:opacity-100
          "
        >
          {description}
        </p>
      )}

      {/* 🔗 LinkedIn */}
      {linkedinUrl && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            absolute left-[22px] top-[22px] z-10
            w-[40px] h-[40px] rounded-full border-[4px]
            border-secondary2 flex items-center justify-center
            opacity-0 transition-all duration-500
            group-hover:opacity-100
            group-[.is-active]:opacity-100
          "
        >
          <Linkedin size={22} className="text-white" />
        </a>
      )}
    </div>
  );
}
