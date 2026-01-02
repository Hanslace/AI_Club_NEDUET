"use client";

import Image from "next/image";

export default function SponsorsSection() {
  const sponsors = [
    { name: "Gaditech", src: "/images/sponsors/gaditech.svg", width: 120, height: 68 },
    { name: "NCAI", src: "/images/sponsors/ncai.svg", width: 120, height: 70 },
    { name: "Futurerality", src: "/images/sponsors/futurerality.svg", width: 320, height: 180 },
    { name: "Afiniti", src: "/images/sponsors/afiniti.svg", width: 120, height: 58 },
    { name: "NCAI Smart City", src: "/images/sponsors/ncai_smart_city.svg", width: 80, height: 80 },
    { name: "Karachi AI", src: "/images/sponsors/karachi ai.svg", width: 150, height: 150 },
    { name: "Folio3", src: "/images/sponsors/folio3.svg", width: 90, height: 44 },
  ];

  return (
    <section className="relative w-full bg-[#F0F8FF] py-[6vh] px-[1vw] flex flex-col items-center text-center">
      {/* Title */}
      <h2 className="font-heading font-bold text-[clamp(20px,3vw,32px)] text-black mb-[5vh] tracking-tight">
        Collaborated With Trusted Partners
      </h2>

      {/* Logos Grid */}
      <div className="flex flex-wrap justify-center items-center gap-[3vw] max-w-[90%]">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.name}
            className="flex items-center justify-center w-[clamp(50px,12vw,110px)] h-auto transition-transform hover:scale-105"
          >
            <Image
              src={sponsor.src}
              alt={sponsor.name}
              width={sponsor.width}
              height={sponsor.height}
              className="object-contain w-full h-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
