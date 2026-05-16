import { client } from "@/sanity/lib/client";
import { teamMembersQuery } from "@/sanity/lib/queries";
import AboutClient from "./components/AboutClient";
import type { SanityTeamMember } from "./components/MeetTheTeam/MeetTheTeam";

export const revalidate = 60;

async function About() {
	const members: SanityTeamMember[] = await client.fetch(teamMembersQuery);

	return <AboutClient members={members} />;
}

export default About;
