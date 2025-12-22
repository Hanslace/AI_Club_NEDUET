"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center w-full min-h-screen bg-background text-center px-[5vw] pb-[15vh] overflow-hidden"
    >
      {/* 🔔 Announcement Banner */}
      <div className="flex items-center gap-[1vw] border border-secondary1/70 rounded-[1vw] px-[2vw] py-[1vh] mb-[3vh] shadow-[0_0_1vw_rgba(255,87,51,0.25)]">
        <div className="w-[0.8vw] h-[0.8vw] rounded-full bg-primary2 shadow-[0_0_1vw_#FF5733]" />
        <p className="font-sans text-secondary1 text-[clamp(14px,1.5vw,18px)] font-medium tracking-tight">
          Stay tuned for our{" "}
          <span className="text-primary2 font-semibold">
            New Event in October
          </span>
        </p>
      </div>

      {/* 🧠 Main Heading */}
      <h1 className="font-heading font-bold uppercase text-[clamp(30px,6vw,70px)] leading-[1.1] text-primary1 max-w-[900px]">
        Learn AI with AI Club & Build Real Projects.
      </h1>

      {/* 💬 Subtext */}
      <p className="font-sans text-secondary1 text-[clamp(16px,2.5vw,28px)] leading-[1.3] tracking-tight max-w-[750px] mt-[2vh]">
        Preparing the future generations of Pakistan for the imminent AI
        revolution.
      </p>

      {/* 🚀 CTA Button */}
      <Link
        href="/not-available-yet"
        className="mt-[4vh] px-[4vw] py-[1.5vh] bg-primary2 text-background text-[clamp(18px,3vw,30px)] font-heading font-bold rounded-[2vw] shadow-[0_0_3vw_rgba(255,87,51,0.5)] hover:bg-primary1 transition-all duration-300"
      >
        Join Now
      </Link>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[15vh] bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
    </section>
  );
}
