"use client";

import type { CSSProperties } from "react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import BorderDivider from "@/components/layout/BorderDivider/BorderDivider";
import Image from "next/image";
import { avoidAdviceItems } from "./avoidAdvice";

function fadeIn(visible: boolean, delayMs: number): CSSProperties {
	return {
		opacity: visible ? 1 : 0,
		transform: visible ? "translateY(0)" : "translateY(16px)",
		transition: visible
			? `opacity 0.6s ease ${delayMs}ms, transform 0.6s ease ${delayMs}ms`
			: "none",
	};
}

function ThingsToAvoid() {
	const { ref, inView } = useInViewAnimation<HTMLElement>();

	return (
		<section
			ref={ref}
			className="bg-primary-500 flex flex-col gap-4.5 items-center"
		>
			<BorderDivider variant="botanical-muted-green" />
			<div className="w-full max-w-310 flex flex-col gap-6 py-2.5 sm:px-4 md:px-8 xl:gap-8">
				<h2 className="text-center text-title-md font-title text-primary-50 lg:text-title-lg">
					Things to avoid
				</h2>
				<span className="flex flex-col gap-6">
					<div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{avoidAdviceItems.map((item, i) => (
							<div
								key={item.title}
								style={fadeIn(inView, i * 150)}
								className="flex flex-col items-center gap-2 bg-secondary-200 min-h-75 px-5 py-8 sm:border-[3px] border-primary-600 sm:rounded-xl"
							>
								<Image
									src={item.image}
									alt={item.title}
									width={120}
									height={120}
								/>
								<span className="flex flex-col gap-3">
									<h3 className="text-[28px] leading-6.5 font-title text-primary-950 text-center">
										{item.title}
									</h3>
									<p className="text-body-lg font-body text-primary-950 text-center">
										{item.description}
									</p>
								</span>
							</div>
						))}
					</div>
					<p
						style={fadeIn(inView, avoidAdviceItems.length * 150 + 200)}
						className="text-body-xl font-body text-primary-50 px-4 text-center sm:text-left sm:px-0"
					>
						Redness and swelling are normal for the first 48 hours. However, if
						you experience extreme pain, spreading rashes, or a fever, please
						contact a medical professional and let your artist know.
					</p>
				</span>
			</div>
			<BorderDivider variant="botanical-muted-green" flipped={true} />
		</section>
	);
}

export default ThingsToAvoid;
