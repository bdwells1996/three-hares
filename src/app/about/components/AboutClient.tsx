"use client";

import Header from "@/components/layout/Header/Header";
import MeetTheTeam from "./MeetTheTeam/MeetTheTeam";
import CTABanner from "@/components/ui/CTABanner";
import { useRef } from "react";
import type { SanityTeamMember } from "./MeetTheTeam/MeetTheTeam";

const buttonConfig = [
	{
		buttonText: "See more work",
		buttonLink: "/work",
	},
	{
		buttonText: "Contact us",
		buttonLink: "/contact",
	},
];

interface AboutClientProps {
	members: SanityTeamMember[];
}

export default function AboutClient({ members }: AboutClientProps) {
	const meetTheTeamRef = useRef<HTMLElement>(null);

	return (
		<main>
			<Header
				images={{
					xl: { src: "/images/home/header-xl.jpg", width: 1920, height: 1080 },
					lg: { src: "/images/home/header-lg.jpg", width: 1240, height: 698 },
					md: { src: "/images/home/header-md.jpg", width: 768, height: 432 },
					sm: { src: "/images/home/header-sm.jpg", width: 448, height: 494 },
				}}
				title="About us"
				subtitle="We are a private, wheelchair accessible studio. You will be greeted at the gate, or buzzed in through the intercom. We are tucked away down a quiet path, where you can enjoy some peace away from the city. Our studio is a safe space for all. We care deeply about protecting our space, and having a team that allies themselves with our queer, trans and neurodiverse community. We have a friendly team who are all passionate about their craft, and a wonderful studio manager and co-founder Harley, and their sausage dog, Ivy. Find out more about our team in the ‘meet the team’ section."
				scrollTargetRef={meetTheTeamRef}
			/>
			<MeetTheTeam ref={meetTheTeamRef} members={members} />
			<CTABanner title="Want to work with us?" buttons={buttonConfig} />
		</main>
	);
}
