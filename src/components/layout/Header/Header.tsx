"use client";

import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { getImageProps } from "next/image";
import Link from "next/link";
import { type CSSProperties, type RefObject, useEffect, useState } from "react";
import { FolkArrow } from "@/components/icons/FolkArrow";
import { useAnimation } from "@/context/AnimationContext";

type ResponsiveImage = {
	src: string;
	width: number;
	height: number;
};

type HeaderProps = {
	images: {
		xl: ResponsiveImage;
		lg: ResponsiveImage;
		md: ResponsiveImage;
		sm: ResponsiveImage;
	};
	title: string;
	subtitle?: string;
	buttonLink?: string;
	buttonText?: string;
	showScrollButton?: boolean;
	scrollTargetRef?: RefObject<HTMLElement | null>;
};

function fadeIn(isReady: boolean, delayMs: number): CSSProperties {
	return {
		opacity: isReady ? 1 : 0,
		transform: isReady ? "translateY(0)" : "translateY(16px)",
		transition: isReady
			? `opacity 0.6s ease ${delayMs}ms, transform 0.6s ease ${delayMs}ms`
			: "none",
	};
}

export default function Header({
	images,
	title,
	subtitle,
	buttonLink,
	buttonText,
	showScrollButton = true,
	scrollTargetRef,
}: HeaderProps) {
	const { isReady } = useAnimation();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (!isReady) return;
		const id = requestAnimationFrame(() => setVisible(true));
		return () => cancelAnimationFrame(id);
	}, [isReady]);

	const common = { alt: "Header", sizes: "100vw", priority: true };

	const { props: xlProps } = getImageProps({ ...common, ...images.xl });
	const { props: lgProps } = getImageProps({ ...common, ...images.lg });
	const { props: mdProps } = getImageProps({ ...common, ...images.md });
	const { props: smProps } = getImageProps({ ...common, ...images.sm });

	return (
		<header className="h-svh w-full flex relative justify-center items-center">
			<picture className="absolute inset-0 -z-1">
				<source media="(max-width: 448px)" srcSet={smProps.srcSet} />
				<source media="(max-width: 768px)" srcSet={mdProps.srcSet} />
				<source media="(max-width: 1240px)" srcSet={lgProps.srcSet} />
				<img
					{...xlProps}
					alt="hares-header"
					className="w-full h-full object-cover"
				/>
			</picture>
			<div className="max-w-[885px] w-full px-6 flex flex-col items-center gap-4 text-center md:px-14">
				<h1
					style={fadeIn(visible, 0)}
					className="text-title-lg font-title lg:text-title-xl xl:text-title-2xl"
				>
					{title}
				</h1>
				<div className="flex flex-col items-center gap-7">
					{subtitle && (
						<p style={fadeIn(visible, 150)} className="text-body-xl font-body">
							{subtitle}
						</p>
					)}
					{buttonLink && buttonText && (
						<div style={fadeIn(visible, 300)}>
							<Link href={buttonLink}>
								<Button
									className="text-[24px] px-6 xl:text-[26px]"
									tabIndex={-1}
								>
									{buttonText}
								</Button>
							</Link>
						</div>
					)}
				</div>
			</div>
			{showScrollButton && (
				<button
					type="button"
					style={fadeIn(visible, 600)}
					className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
					onClick={() =>
						scrollTargetRef?.current?.scrollIntoView({
							behavior: "smooth",
							block: "start",
						})
					}
				>
					<span className="text-[24px] font-title">Find out more</span>
					<span
						style={
							visible
								? {
										animation:
											"scroll-bounce 2s cubic-bezier(0.68,-0.55,0.27,1.55) infinite",
										animationDelay: "1.2s",
									}
								: undefined
						}
					>
						<Icon icon={FolkArrow} />
					</span>
				</button>
			)}
		</header>
	);
}
