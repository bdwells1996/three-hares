"use client";

import { type CSSProperties } from "react";
import clsx from "clsx";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import BotanicalBorder from "./BotanicalBorder";

type BorderVariant = "flower" | "botanical" | "botanical-muted" | "botanical-muted-green";

type BorderDividerProps = {
	variant: BorderVariant;
	flipped?: boolean;
};

function fadeIn(visible: boolean): CSSProperties {
	return {
		opacity: visible ? 1 : 0,
		transition: visible ? "opacity 0.6s ease" : "none",
	};
}

const variantSources: Partial<
	Record<
		BorderVariant,
		{ breakpoint: string; src: string; width: number; height: number }[]
	>
> = {
	flower: [
		{
			breakpoint: "(max-width: 448px)",
			src: "/images/borders/flower-border/flower-border-sm.svg",
			width: 448,
			height: 40,
		},
		{
			breakpoint: "(max-width: 768px)",
			src: "/images/borders/flower-border/flower-border-md.svg",
			width: 768,
			height: 40,
		},
		{
			breakpoint: "(max-width: 1240px)",
			src: "/images/borders/flower-border/flower-border-lg.svg",
			width: 1240,
			height: 40,
		},
		{
			breakpoint: "(max-width: 1440px)",
			src: "/images/borders/flower-border/flower-border-xl.svg",
			width: 1440,
			height: 40,
		},
		{
			breakpoint: "(max-width: 1920px)",
			src: "/images/borders/flower-border/flower-border-xxl.svg",
			width: 1920,
			height: 40,
		},
	],
};

const variantDefault: Record<BorderVariant, string> = {
	flower: "/images/borders/flower-border/flower-border-xxl.svg",
	botanical: "/images/borders/botanical-border/botanical-border.svg",
	"botanical-muted": "/images/borders/botanical-border/botanical-border-muted.svg",
	"botanical-muted-green": "/images/borders/botanical-border/botanical-border-muted-green.svg",
};

export default function BorderDivider({ variant, flipped }: BorderDividerProps) {
	const { ref, inView } = useInViewAnimation<HTMLDivElement>();
	const flipClass = flipped ? "rotate-180" : "";

	if (variant === "botanical" || variant === "botanical-muted" || variant === "botanical-muted-green") {
		return (
			<div ref={ref} className={clsx({
				"bg-secondary-200": variant === "botanical" || variant === "botanical-muted",
				"bg-primary-500": variant === "botanical-muted-green",
			})}>
				<BotanicalBorder src={variantDefault[variant]} className={flipClass} imgStyle={fadeIn(inView)} />
			</div>
		);
	}

	const sources = variantSources[variant];
	const fallback = variantDefault[variant];

	return (
		<div ref={ref} className="bg-primary-300">
			<picture className={`block w-full ${flipClass}`}>
				{sources?.map(({ breakpoint, src }) => (
					<source key={breakpoint} media={breakpoint} srcSet={src} />
				))}
				<img src={fallback} alt="" style={fadeIn(inView)} className="w-full h-auto" />
			</picture>
		</div>
	);
}
