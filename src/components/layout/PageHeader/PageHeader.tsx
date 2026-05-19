"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { useAnimation } from "@/context/AnimationContext";

type PageHeaderProps = {
	title: string;
	subtitle?: string;
	className?: string;
	titleClassName?: string;
	subtitleClassName?: string;
};

function fadeIn(visible: boolean, delayMs: number): CSSProperties {
	return {
		opacity: visible ? 1 : 0,
		transform: visible ? "translateY(0)" : "translateY(16px)",
		transition: visible
			? `opacity 0.6s ease ${delayMs}ms, transform 0.6s ease ${delayMs}ms`
			: "none",
	};
}

export default function PageHeader({
	title,
	subtitle,
	className,
	titleClassName,
	subtitleClassName,
}: PageHeaderProps) {
	const { isReady } = useAnimation();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (!isReady) return;
		const id = requestAnimationFrame(() => setVisible(true));
		return () => cancelAnimationFrame(id);
	}, [isReady]);

	return (
		<div className={`flex flex-col items-center gap-4 max-w-[1240px] ${className ?? ""}`}>
			<h1
				style={fadeIn(visible, 0)}
				className={`text-title-md font-title text-center lg:text-title-lg xl:text-title-xl ${titleClassName ?? "text-primary-950"}`}
			>
				{title}
			</h1>
			{subtitle && (
				<p
					style={fadeIn(visible, 150)}
					className={`text-body-lg max-w-[800px] text-center xl:text-body-xl ${subtitleClassName ?? "text-primary-950"}`}
				>
					{subtitle}
				</p>
			)}
		</div>
	);
}
