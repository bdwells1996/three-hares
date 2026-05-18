"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "../../Logo";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function ScrollLogo({ className }: { className?: string }) {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	useEffect(() => {
		const el = wrapperRef.current;
		if (!el) return;

		const totalScroll = document.body.scrollHeight - window.innerHeight;
		const rotations = totalScroll / 2000;

		const tween = gsap.to(el, {
			rotation: 360 * rotations,
			ease: "none",
			scrollTrigger: {
				trigger: document.body,
				start: "top top",
				end: `+=${totalScroll}`,
				scrub: 1,
			},
		});

		return () => {
			tween.scrollTrigger?.kill();
			tween.kill();
			gsap.set(el, { rotation: 0 });
		};
	}, [pathname]);

	return (
		<div ref={wrapperRef} className={className}>
			<Link href="/">
				<Logo />
			</Link>
		</div>
	);
}
