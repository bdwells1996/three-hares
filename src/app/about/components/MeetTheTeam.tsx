import BorderDivider from "@/components/layout/BorderDivider/BorderDivider";
import { forwardRef } from "react";

const MeetTheTeam = forwardRef<HTMLElement>(function MeetTheTeam(_, ref) {
	return (
		<section ref={ref} className="h-svh">
			<BorderDivider variant="botanical" />
		</section>
	);
});

export default MeetTheTeam;
