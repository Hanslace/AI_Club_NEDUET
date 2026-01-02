import {ActivityCard} from "@/components";

export default function ActivitySection() {
  const activities = [
    {
      imageName: "activities/courses.svg",
      title: "Courses",
      description: "Online and physical learning opportunities for individuals to gain knowledge on AI-related subjects.",
    },
    {
      imageName: "activities/festival.svg",
      title: "AI Festival",
      description: "Provides enthusiasts the opportunity to engage in AI-related activities, seminars, and contests.",
    },
    {
      imageName: "activities/bootcamp.svg",
      title: "Bootcamps",
      description: "Training camps and programs created to help individuals gain first-hand experience in AI technologies.",
    },
  ];

  return (
    <section className="flex flex-col items-center bg-background py-[8vh] px-[5vw]">
      <h2 className="font-heading text-[clamp(36px,6vw,64px)] font-bold text-primary1 uppercase tracking-tight">
        How AI Club Works
      </h2>

      <p className="font-sans text-secondary1 text-[clamp(18px,2vw,28px)] max-w-[800px] mt-[2vh] text-center">
        The AI Club brings the young AI startups into spotlight linking them with potential investors.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[3rem] mt-[8vh] justify-items-center w-full max-w-[1300px]">
        {activities.map((item, idx) => (
          <ActivityCard key={idx} {...item} />
        ))}
      </div>
    </section>
  );
}
