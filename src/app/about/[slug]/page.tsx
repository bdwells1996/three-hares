import { notFound } from "next/navigation";
import Header from "@/components/layout/Header/Header";
import InstagramGallery from "@/components/InstagramGallery/InstagramGallery";
import CTABanner from "@/components/ui/CTABanner";
import { teamMembers } from "../components/MeetTheTeam/teamMembers";
import BorderDivider from "@/components/layout/BorderDivider/BorderDivider";
import ArtistHero from "./ArtistHero";

const ctaButtons = [
	{ buttonText: "Get booked in with us", buttonLink: "/contact" },
];

export function generateStaticParams() {
	return teamMembers
		.filter((m) => m.buttonLink.startsWith("/about/"))
		.map((m) => ({ slug: m.buttonLink.replace("/about/", "") }));
}

export default async function ArtistPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const member = teamMembers.find((m) => m.buttonLink === `/about/${slug}`);

	if (!member) notFound();

	return (
		<main>
			<ArtistHero
				name={member.name}
				role={member.role}
				pronouns={member.pronouns}
				description={member.description}
				image={member.image}
			/>
			<span className="block -mb-px">
				<BorderDivider variant="botanical" />
			</span>
			<InstagramGallery className="py-2 lg:py-8" variant="secondary" />
			<span className="block -mb-px">
				<BorderDivider variant="botanical" />
			</span>
			<CTABanner title={`Like ${member.name}'s work?`} buttons={ctaButtons} />
		</main>
	);
}
