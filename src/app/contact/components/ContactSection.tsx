"use client";

import { type CSSProperties } from "react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import ContactForm from "./ContactForm";

function fadeIn(visible: boolean, delayMs: number): CSSProperties {
	return {
		opacity: visible ? 1 : 0,
		transform: visible ? "translateY(0)" : "translateY(16px)",
		transition: visible
			? `opacity 0.6s ease ${delayMs}ms, transform 0.6s ease ${delayMs}ms`
			: "none",
	};
}

export default function ContactSection() {
	const { ref, inView } = useInViewAnimation<HTMLDivElement>();

	return (
		<div ref={ref} className="flex flex-col items-center gap-7 w-full max-w-[680px]">
			<h1
				style={fadeIn(inView, 0)}
				className="font-title text-title-md text-primary-950 text-center lg:text-title-lg"
			>
				Get in touch
			</h1>
			<div style={fadeIn(inView, 150)} className="w-full">
				<ContactForm />
			</div>
		</div>
	);
}
