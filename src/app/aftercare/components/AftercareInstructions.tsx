"use client";

import type { CSSProperties } from "react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { StarAdornment } from "@/components/icons/StarAdornment";
import { Icon } from "@/components/ui/Icon";

function fadeIn(visible: boolean, delayMs: number): CSSProperties {
	return {
		opacity: visible ? 1 : 0,
		transform: visible ? "translateY(0)" : "translateY(16px)",
		transition: visible
			? `opacity 0.6s ease ${delayMs}ms, transform 0.6s ease ${delayMs}ms`
			: "none",
	};
}

function AftercareInstructions() {
	const { ref, inView } = useInViewAnimation<HTMLElement>();

	return (
		<section
			ref={ref}
			className="bg-secondary-200 pt-4 pb-10 flex flex-col gap-6 items-center px-4 md:px-8 lg:gap-8"
		>
			<div
				style={fadeIn(inView, 0)}
				className="w-full max-w-[1240px] flex flex-col gap-3.5"
			>
				<h3 className="font-title text-[26px] leading-[34px] text-primary-950">
					Depending on your artist's recommendation, you will likely leave the
					studio with either a traditional bandage or a medical-grade adhesive
					film (like "Second Skin").
				</h3>
				<ul className="text-body-lg flex flex-col gap-2.5 xl:text-body-xl">
					<li className="flex flex-col gap-1.5 text-primary-950 sm:flex-row sm:items-start sm:gap-1.5">
						<span className="flex shrink-0 items-center gap-1.5">
							<Icon
								icon={StarAdornment}
								size={18}
								className="fill-primary-500"
							/>
							<span className="font-semibold">Clingfilm:</span>
						</span>
						<span>
							Keep it on for 2–4 hours. Do not re-bandage once removed.
						</span>
					</li>
					<li className="flex flex-col gap-0.5 text-primary-950 sm:flex-row sm:items-start sm:gap-1.5">
						<span className="flex shrink-0 items-center gap-1.5">
							<Icon
								icon={StarAdornment}
								size={18}
								className="fill-primary-500"
							/>
							<span className="font-semibold">Second Skin:</span>
						</span>
						<span>
							Keep it on for 24–48 hours. Do not re-bandage once removed.
						</span>
					</li>
				</ul>
			</div>
			<div
				style={fadeIn(inView, 200)}
				className="w-full max-w-[1240px] flex flex-col gap-3.5 xl:gap-5"
			>
				<span>
					<h3 className="font-title text-[26px] leading-[34px] text-primary-950">
						Cleaning Your Tattoo
					</h3>
					<p className="text-body-lg text-primary-950 mt-1 xl:text-body-xl">
						Once the bandage is off, cleanliness is your top priority.
					</p>
				</span>
				<ol className="text-body-lg flex flex-col gap-2.5 xl:text-body-xl">
					<li className="flex items-start gap-1.5 text-primary-950">
						<span className="font-title text-[24px] text-primary-600">1.</span>
						Wash your hands first: Never touch a healing tattoo with dirty
						hands.
					</li>
					<li className="flex items-start gap-1.5 text-primary-950">
						<span className="font-title text-[24px] text-primary-600">2.</span>
						Use lukewarm water: Avoid hot water, as it can open pores and cause
						ink loss.
					</li>
					<li className="flex items-start gap-1.5 text-primary-950">
						<span className="font-title text-[24px] text-primary-600">3.</span>
						Gentle Soap: Use a mild, fragrance-free, antibacterial liquid soap.
					</li>
					<li className="flex items-start gap-1.5 text-primary-950">
						<span className="font-title text-[24px] text-primary-600">4.</span>
						Air Dry: Gently pat the area with a clean paper towel or let it air
						dry. Do not rub or use a fluffy bath towel, which can harbor
						bacteria.
					</li>
				</ol>
			</div>
			<div
				style={fadeIn(inView, 400)}
				className="w-full max-w-[1240px] flex flex-col gap-3.5 xl:gap-5"
			>
				<span>
					<h3 className="font-title text-[26px] leading-[34px] text-primary-950">
						Moisturising & Maintenance
					</h3>
					<p className="text-body-lg text-primary-950 mt-1 xl:text-body-xl">
						After the first 24–48 hours, your tattoo will begin to feel tight or
						dry.
					</p>
				</span>
				<ul className="text-body-lg flex flex-col gap-2.5 xl:text-body-xl">
					<li className="flex items-start gap-1.5 text-primary-950">
						<Icon icon={StarAdornment} size={18} className="fill-primary-500" />
						Less is More: Apply a very thin layer of fragrance-free lotion or
						specialized tattoo balm. The tattoo should have a slight sheen, not
						a thick coating
					</li>
					<li className="flex items-start gap-1.5 text-primary-950">
						<Icon icon={StarAdornment} size={18} className="fill-primary-500" />
						Frequency: Repeat the wash-and-moisturize routine 2–3 times a day
						until the skin has finished peeling.
					</li>
				</ul>
			</div>
		</section>
	);
}

export default AftercareInstructions;
