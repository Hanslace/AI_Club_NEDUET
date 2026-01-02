"use client";

import {AboutCard} from "@/components";

export default function AboutSection() {
  const cards = [
    {
      imageName: "vision/goal.svg",
      title: "Our Mission",
      subtitle: "Mentoring and training the young AI innovators",
      description:
        "The AI Club was founded to serve the primary motive of providing opportunities and a networking medium for students in the domain of artificial intelligence.",
    },
    {
      imageName: "vision/sight.svg",
      title: "Our Vision",
      subtitle:
        "Preparing the future generations of Pakistan for the imminent AI Revolution.",
      description:
        "We aim to foster a vibrant AI community that empowers learners to build, innovate, and lead Pakistan into a future driven by artificial intelligence.",
    },
  ];

  return (
    <section
      id="about"
      className="relative flex flex-col items-center justify-center bg-background py-[8vh] px-[5vw] text-center overflow-hidden justify-items-center"
    >
      {/* 🧭 Section Title */}
      <h2 className="font-heading text-[clamp(36px,6vw,64px)] font-bold text-primary1 tracking-tight leading-tight uppercase">
        Who We Are?
      </h2>

      {/* 💬 Section Subtitle */}
      <p className="font-sans text-[clamp(18px,2vw,30px)] text-secondary1 mt-[2vh] max-w-[800px] leading-snug tracking-tight">
        Preparing the future generations of Pakistan for the imminent AI
        revolution.
      </p>

      {/* 🧠 Cards */}
      <div className="flex flex-col lg:flex-row justify-center items-stretch gap-[5vw] mt-[8vh] w-full max-w-[1300px]">
        {cards.map((card, idx) => (
          <AboutCard key={idx} {...card} />
        ))}
      </div>
    </section>
  );
}
