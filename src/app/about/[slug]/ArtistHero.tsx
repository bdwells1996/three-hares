"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Icon } from "@/components/ui/Icon";
import { StarAdornment } from "@/components/icons/StarAdornment";
import { useAnimation } from "@/context/AnimationContext";

type Props = {
	name: string;
	role: string;
	pronouns: string;
	description: string;
	image: string;
};

export default function ArtistHero({ name, role, pronouns, description, image }: Props) {
	const { isReady } = useAnimation();
	const imageColRef = useRef<HTMLDivElement>(null);
	const bodyItemsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isReady || !imageColRef.current || !bodyItemsRef.current) return;

		const imageEl = imageColRef.current;
		const bodyItems = bodyItemsRef.current.children;

		const tl = gsap.timeline();

		tl.fromTo(
			imageEl,
			{ opacity: 0, y: 16 },
			{ opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
		).fromTo(
			bodyItems,
			{ opacity: 0, y: 12 },
			{
				opacity: 1,
				y: 0,
				duration: 0.5,
				stagger: 0.15,
				ease: "power2.out",
			},
			0.2,
		);
	}, [isReady]);

	return (
		<section className="flex justify-center bg-secondary-200 px-4 pb-8 pt-30 py-12 md:px-8 md:pt-32">
			<div className="flex flex-col justify-center gap-8 w-full max-w-310 lg:flex-row lg:gap-14">
				<div ref={imageColRef} className="flex flex-col w-full md:px-18 lg:px-0 lg:max-w-100 shrink-0" style={{ opacity: 0 }}>
					<Image
						src="/images/team/border-leaf.svg"
						alt="Border leaf"
						width={138}
						height={102}
						className="w-1/2 h-auto"
					/>
					<Image
						src={image}
						alt={name}
						width={280}
						height={212}
						className="my-[-24%] mx-[12.5%] w-[75%] h-auto rounded-lg"
					/>
					<Image
						src="/images/team/border-leaf.svg"
						alt="Border leaf"
						width={138}
						height={102}
						className="w-1/2 h-auto self-end rotate-180"
					/>
				</div>
				<div className="flex flex-col gap-4.5 py-4">
					<div ref={bodyItemsRef} className="flex flex-col gap-4.5">
						<div className="flex flex-col items-start gap-1" style={{ opacity: 0 }}>
							<h3 className="text-title-sm font-title text-primary-800 lg:text-title-md">
								{name}
							</h3>
							<span className="flex items-center gap-2 text-body-xl font-title text-primary-700">
								<p>{role}</p>
								<Icon icon={StarAdornment} />
								<p>{pronouns}</p>
							</span>
						</div>
						<p className="text-body-lg text-primary-800 max-w-[600px]" style={{ opacity: 0 }}>
							{description}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
