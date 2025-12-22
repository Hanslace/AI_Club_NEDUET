"use client";

import {Card4} from "@/../components";

export default function TeamSection() {
  const team = [
    {
      imageName: "team/khaby.svg",
      name: "Khaby Lame",
      role: "Founder & CEO",
      description:
        "Training camps and programmes created to help individuals gain first-hand experience in AI technologies.",
      linkedinUrl: "#",
    },
    {
      imageName: "team/khaby.svg",
      name: "Sarah Ahmed",
      role: "Head of Research",
      description:
        "Leading AI research initiatives to foster innovation and collaboration across domains.",
      linkedinUrl: "#",
    },
    {
      imageName: "team/khaby.svg",
      name: "John Doe",
      role: "Technical Lead",
      description:
        "Overseeing system design, ML pipelines, and AI architecture for all ongoing projects.",
      linkedinUrl: "#",
    },
    {
      imageName: "team/khaby.svg",
      name: "Ayesha Khan",
      role: "Program Coordinator",
      description:
        "Manages community events, hackathons, and external partnerships to empower members.",
      linkedinUrl: "#",
    },
    {
      imageName: "team/khaby.svg",
      name: "Ali Raza",
      role: "Lead Designer",
      description:
        "Crafting intuitive UI/UX for AI-powered platforms and ensuring brand consistency.",
      linkedinUrl: "#",
    },
    {
      imageName: "team/khaby.svg",
      name: "Fatima Noor",
      role: "AI Developer",
      description:
        "Building scalable ML solutions and data pipelines to automate business intelligence.",
      linkedinUrl: "#",
    },
    {
      imageName: "team/khaby.svg",
      name: "Fatima Noor",
      role: "AI Developer",
      description:
        "Building scalable ML solutions and data pipelines to automate business intelligence.",
      linkedinUrl: "#",
    },
    {
      imageName: "team/khaby.svg",
      name: "Fatima Noor",
      role: "AI Developer",
      description:
        "Building scalable ML solutions and data pipelines to automate business intelligence.",
      linkedinUrl: "#",
    },
  ];

  return (
    <section
      id="team"
      className="relative flex flex-col items-center justify-center bg-background py-[8vh] px-[5vw] text-center overflow-hidden"
    >
      {/* 🧭 Section Title */}
      <h2 className="font-heading text-[clamp(36px,6vw,64px)] font-bold text-primary1 tracking-tight leading-tight uppercase">
        Our Teams
      </h2>

      {/* 💬 Section Subtitle */}
      <p className="font-sans text-[clamp(18px,2vw,30px)] text-secondary1 mt-[2vh] max-w-[850px] leading-snug tracking-tight">
        The AI Club brings the young AI startups into spotlight — linking them
        with potential investors.
      </p>

      {/* 👥 Team Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem] mt-[8vh] w-full max-w-[1300px] justify-items-center">
        {team.map((member, idx) => (
          <Card4 key={idx} {...member} />
        ))}
      </div>


      <button className="group relative mt-[6vh] flex items-center justify-center font-space-grotesk text-[24px] font-bold text-primary1 uppercase tracking-wide transition-colors duration-300 hover:text-primary2">
        See All
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-3 w-7 h-7 transition-transform duration-300 group-hover:translate-x-2"
        >
          <path d="M5 12h14" />
          <path d="M13 5l7 7-7 7" />
        </svg>

        {/* subtle underline animation */}
        <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-primary1 group-hover:w-[60%] group-hover:left-[20%] transition-all duration-500 ease-in-out"></span>
      </button>


    </section>
  );
}
