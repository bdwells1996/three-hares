"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { clsx } from "clsx";

gsap.registerPlugin(ScrollTrigger);

const HARE_WIDTH = 165;
const HARE_HEIGHT = 74;
const HARE_GAP = 60;

// One screenful visible + one screenful buffer coming in from the right
// At 1920px: ceil(1920 / (165+60)) = 9 visible, so 18 + 2 headroom = 20
const HARE_COUNT = 18;

interface HaresBorderProps {
	className?: string;
	/** Scale multiplier for hare size. Default 1 (normal border size). */
	scale?: number;
	/** Scroll distance multiplier — lower = slower parallax. Default 0.15. */
	parallaxStrength?: number;
}

export default function HaresBorder({
	className,
	scale = 1,
	parallaxStrength = 0.15,
}: HaresBorderProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);

	const width = HARE_WIDTH * scale;
	const height = HARE_HEIGHT * scale;
	const gap = HARE_GAP * scale;

	useEffect(() => {
		const track = trackRef.current;
		const container = containerRef.current;
		if (!track || !container) return;

		// Half the hares fill the screen; the other half are the off-screen buffer.
		// Animate by exactly half the total track width so the buffer replaces the visible set.
		const halfWidth = (HARE_COUNT / 2) * (width + gap) * parallaxStrength;

		gsap.set(track, { x: 0 });

		const tween = gsap.to(track, {
			x: -halfWidth,
			ease: "none",
			scrollTrigger: {
				trigger: container,
				start: "top bottom",
				end: "bottom top",
				scrub: 1,
			},
		});

		return () => {
			tween.scrollTrigger?.kill();
			tween.kill();
		};
	}, [width, gap, parallaxStrength]);

	return (
		<div
			ref={containerRef}
			className={clsx(
				"w-full overflow-hidden bg-secondary-100 py-5",
				className,
			)}
			aria-hidden="true"
		>
			<div
				ref={trackRef}
				className="flex will-change-transform"
				style={{ gap }}
			>
				{Array.from({ length: HARE_COUNT }).map((_, i) => (
					<Image
						// biome-ignore lint/suspicious/noArrayIndexKey: static decorative list
						key={i}
						src="/images/borders/hares-border/hares-border-hare.svg"
						alt=""
						width={width}
						height={height}
						className="shrink-0"
					/>
				))}
			</div>
		</div>
	);
}
