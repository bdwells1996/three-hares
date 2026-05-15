import BorderDivider from "@/components/layout/BorderDivider/BorderDivider";
import { forwardRef } from "react";
import MeetTheTeamItem from "./components/MeetTheTeamItem";
import { teamMembers } from "./teamMembers";
import HaresBorder from "@/components/layout/HaresBorder/HaresBorder";

const MeetTheTeam = forwardRef<HTMLElement>(function MeetTheTeam(_, ref) {
	return (
		<section
			ref={ref}
			className="min-h-svh flex flex-col items-center bg-secondary-300 relative"
		>
			<BorderDivider variant="botanical" />
			<div className="flex flex-col w-full max-w-310 pt-5.5 pb-12 px-4 gap-6.5 md:px-8 lg:gap-8 z-2">
				<h2 className="text-center text-title-md font-title text-primary-900 lg:text-title-lg">
					Meet the team
				</h2>
				<div className="w-full max-w-310 flex flex-col gap-9 lg:gap-14">
					{teamMembers.map((member) => (
						<MeetTheTeamItem
							key={member.name}
							member={member}
							direction={member.direction}
						/>
					))}
				</div>
			</div>
			<HaresBorder
				className="bg-transparent opacity-10 absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none z-0"
				scale={4}
				parallaxStrength={0.05}
			/>
		</section>
	);
});

export default MeetTheTeam;
