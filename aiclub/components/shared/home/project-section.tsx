"use client";

import {Card2} from "@/../components";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative w-full min-h-[879px] bg-background flex flex-col items-center py-[5rem] px-[2rem] md:px-[6rem] overflow-hidden"
    >
      {/* 🔹 Section Header */}
      <div className="text-center mb-[3rem]">
        <h2 className="font-heading text-primary1 text-[clamp(24px,3vw,36px)] font-bold uppercase tracking-wide mb-2">
          Our Projects
        </h2>
        <p className="text-secondary1 font-sans text-[clamp(14px,1.2vw,18px)] max-w-[800px] mx-auto leading-relaxed">
          We work on ambitious projects solutions and enhance the standards of living through technology.
        </p>
      </div>

      {/* 🧩 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[4rem] justify-items-center">
        <Card2
          imageName="projects/image1.svg"
          title="AI-Powered Text Detector"
          description="Using TensorFlow, Anaconda, and the Keras API, this application identifies both the presence and the orientation of cows in images."
        />

        <Card2
          imageName="projects/image2.svg"
          title="Vision-Based Inspection System"
          description="A real-time defect detection solution using OpenCV and machine learning to automate quality assurance in manufacturing pipelines."
        />

        <Card2
          imageName="projects/image3.svg"
          title="Chatbot for Student Assistance"
          description="A fine-tuned conversational AI designed to answer academic queries, guide new members, and enhance learning accessibility."
        />
      </div>
    </section>
  );
}
