import Button from "@/components/ui/Button";
import type { SanityTeamMember } from "../MeetTheTeam";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Icon } from "@/components/ui/Icon";
import { StarAdornment } from "@/components/icons/StarAdornment";
import { urlFor } from "@/sanity/lib/image";

interface MeetTheTeamItemProps {
	member: SanityTeamMember;
	direction?: "left" | "right";
}

function MeetTheTeamItem({ member, direction = "left" }: MeetTheTeamItemProps) {
	const imageUrl = urlFor(member.image).width(560).height(424).url();

	return (
		<div
			className={clsx(
				"flex flex-col items-start gap-4 w-full lg:flex-row lg:gap-10",
				direction === "right" && "lg:flex-row-reverse",
			)}
		>
			<div className="flex flex-col w-full md:px-18 lg:px-0">
				<Image
					src="/images/team/border-leaf.svg"
					alt="Border leaf"
					width={138}
					height={102}
					className="w-1/3 h-auto"
				/>
				<Image
					src={imageUrl}
					alt={member.name}
					width={280}
					height={212}
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
			<div className="py-4 flex flex-col gap-4.5 lg:max-w-[570px] xl:max-w-[600]">
				<div className="flex flex-col gap-1">
					<h3 className="text-title-sm font-title text-primary-800">
						{member.name}
					</h3>
					<span className="flex items-center gap-2 text-body-lg font-title text-primary-700">
						<p>{member.role}</p>
						<Icon icon={StarAdornment} />
						<p>{member.pronouns}</p>
					</span>
				</div>
				<div className="flex flex-col gap-4.5">
					<p className="text-body-lg text-primary-800">{member.description}</p>
					<Link href={member.buttonLink}>
						<Button>{member.buttonText}</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default MeetTheTeamItem;
