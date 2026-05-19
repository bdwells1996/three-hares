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
				subtitle="Lorem ipsum dolor sit amet consectetur. Posuere amet tortor ultricies vestibulum in vitae at. Tellus egestas morbi tempor diam sed. Suspendisse egestas pharetra habitant sit purus blandit metus faucibus sagittis. Consectetur auctor elit sit phasellus a."
				scrollTargetRef={meetTheTeamRef}
			/>
			<MeetTheTeam ref={meetTheTeamRef} members={members} />
			<CTABanner title="Want to work with us?" buttons={buttonConfig} />
		</main>
	);
}
