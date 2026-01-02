import {TeamMemberCard} from "@/components";
import Link from "next/link";

type TeamMember = {
  id: string
  name: string
  role: string
  description: string
  linkedinUrl?: string
  image: {
    url: string
    alt?: string
  }
}

async function getTeamMembers(): Promise<TeamMember[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/team-members?depth=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CMS_READ_TOKEN}`,
      },
      cache: "no-store",
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch team members")
  }

  const data = await res.json()
  return data.docs
}



export default async function TeamSection() {
  const team = await getTeamMembers()

  return (
    <section
      id="team"
      className="relative flex flex-col items-center justify-center bg-background py-[8vh] px-[5vw] text-center overflow-hidden"
    >
      <h2 className="font-heading text-[clamp(36px,6vw,64px)] font-bold text-primary1 uppercase">
        Our Teams
      </h2>

      <p className="font-sans text-[clamp(18px,2vw,30px)] text-secondary1 mt-[2vh] max-w-[850px]">
        The AI Club brings the young AI startups into spotlight — linking them
        with potential investors.
      </p>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem] mt-[8vh] w-full max-w-[1300px] justify-items-center">
        {team.map(member => (
          <TeamMemberCard
            key={member.id}
            imageUrl={member.image.url}
            name={member.name}
            role={member.role}
            description={member.description}
            linkedinUrl={member.linkedinUrl}
          />
        ))}
      </div>

      <Link 
        href="/not-found"
        className="group relative mt-[6vh] flex items-center justify-center font-space-grotesk text-[24px] font-bold text-primary1 uppercase">
        See All
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-3 w-7 h-7 transition-transform group-hover:translate-x-2"
        >
          <path d="M5 12h14" />
          <path d="M13 5l7 7-7 7" />
        </svg>
      </Link>
    </section>
  )
}
