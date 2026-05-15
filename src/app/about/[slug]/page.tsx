import { notFound } from "next/navigation";
import Header from "@/components/layout/Header/Header";
import InstagramGallery from "@/components/InstagramGallery/InstagramGallery";
import CTABanner from "@/components/ui/CTABanner";
import { teamMembers } from "../components/MeetTheTeam/teamMembers";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { StarAdornment } from "@/components/icons/StarAdornment";

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
			<section className="flex justify-center bg-secondary-300 px-4 pb-8 pt-30 py-12 md:px-8 md:pt-32">
				<div className="flex flex-col justify-center gap-8 w-full max-w-310 lg:flex-row lg:gap-14">
					<div className="flex flex-col w-full md:px-18 lg:px-0 lg:max-w-100 shrink-0">
						<Image
							src="/images/team/border-leaf.svg"
							alt="Border leaf"
							width={138}
							height={102}
							className="w-1/3 h-auto"
						/>
						<Image
							src={member.image}
							alt={member.name}
							width={400}
							height={400}
							className="my-[-14%] mx-[12.5%] w-[75%] h-auto rounded-lg"
						/>
						<Image
							src="/images/team/border-leaf.svg"
							alt="Border leaf"
							width={138}
							height={102}
							className="w-1/3 h-auto self-end rotate-180"
						/>
					</div>
					<div className="flex flex-col gap-4.5 py-4">
						<div className="flex flex-col gap-1">
							<h2 className="text-title-sm font-title text-primary-800 lg:text-title-md">
								{member.name}
							</h2>
							<span className="flex items-center gap-2 text-body-lg font-title text-primary-700">
								<p>{member.role}</p>
								<Icon icon={StarAdornment} />
								<p>{member.pronouns}</p>
							</span>
						</div>
						<p className="text-body-lg text-primary-800 max-w-[600px]">
							{member.description}
						</p>
					</div>
				</div>
			</section>
			<InstagramGallery className="py-4 lg:py-10" variant="secondary" />
			<CTABanner title={`Like ${member.name}'s work?`} buttons={ctaButtons} />
		</main>
	);
}
