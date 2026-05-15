"use client";

import Header from "@/components/layout/Header/Header";
import MeetTheTeam from "./components/MeetTheTeam/MeetTheTeam";
import { useRef } from "react";
import CTABanner from "@/components/ui/CTABanner";

const buttonConfig = [
	{
		buttonText: "See more work",
		buttonLink: "/our-work",
	},
	{
		buttonText: "Contact us",
		buttonLink: "/contact",
	},
];

function About() {
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
			<MeetTheTeam ref={meetTheTeamRef} />
			<CTABanner title="Want to work with us?" buttons={buttonConfig} />
		</main>
	);
}

export default About;
