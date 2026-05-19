"use client";

import Link from "next/link";
import clsx from "clsx";
import { type CSSProperties } from "react";
import Button from "./Button";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

interface CTAButton {
	buttonText: string;
	buttonLink: string;
}

interface CTABannerProps {
	title: string;
	buttons: CTAButton[];
	variant?: "primary" | "secondary";
}

function fadeIn(visible: boolean, delayMs: number): CSSProperties {
	return {
		opacity: visible ? 1 : 0,
		transform: visible ? "translateY(0)" : "translateY(16px)",
		transition: visible
			? `opacity 0.6s ease ${delayMs}ms, transform 0.6s ease ${delayMs}ms`
			: "none",
	};
}

function CTABanner({ title, buttons, variant = "primary" }: CTABannerProps) {
	const { ref, inView } = useInViewAnimation<HTMLDivElement>();

	return (
		<div
			className={clsx(
				"flex flex-col items-center gap-7 px-4 py-[34px] lg:py-11",
				variant === "primary" ? "bg-primary-200" : "bg-secondary-200",
			)}
		>
			<h2
				ref={ref}
				style={fadeIn(inView, 0)}
				className="text-primary-950 font-title text-title-md text-center lg:text-title-lg"
			>
				{title}
			</h2>
			<div
				style={fadeIn(inView, 150)}
				className="flex flex-col items-center justify-center gap-4 w-full md:w-auto md:flex-row"
			>
				{buttons.map((btn) => (
					<Link
						key={btn.buttonLink}
						href={btn.buttonLink}
						className="w-full md:w-auto"
					>
						<Button
							tabIndex={-1}
							className="w-full text-[24px] md:w-auto lg:text-title-sm"
						>
							{btn.buttonText}
						</Button>
					</Link>
				))}
			</div>
		</div>
	);
}

export default CTABanner;
