"use client";

import { type CSSProperties } from "react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import Button from "@/components/ui/Button";
import Image from "next/image";

function fadeIn(visible: boolean, delayMs: number): CSSProperties {
	return {
		opacity: visible ? 1 : 0,
		transform: visible ? "translateY(0)" : "translateY(16px)",
		transition: visible
			? `opacity 0.6s ease ${delayMs}ms, transform 0.6s ease ${delayMs}ms`
			: "none",
	};
}

function ReccomendedProducts() {
	const { ref, inView } = useInViewAnimation<HTMLElement>();

	return (
		<section ref={ref} className="pt-10 pb-5 flex flex-col items-center bg-secondary-200 px-4 -mt-[1px] lg:px-8 lg:pb-14 lg:pt-12 xl:pb-19">
			<div className="w-full max-w-[1240px] lg:flex lg:flex-row lg:flex-wrap lg:gap-x-[36px] lg:gap-y-[28px] xl:gap-x-[64px]">
				<h2 style={fadeIn(inView, 0)} className="text-title-md font-title text-center text-primary-950 w-full lg:text-title-lg">
					Products we'd reccomend
				</h2>
				<div style={fadeIn(inView, 0)} className="flex flex-col gap-6 md:px-24 lg:px-0 lg:flex-1 lg:gap-8">
					<div className="relative w-full" style={{ aspectRatio: "440 / 268" }}>
						<Image
							src="/images/products/butterluxe.jpg"
							alt="Aftercare product"
							fill
							className="object-cover"
						/>
					</div>
				</div>
				<div className="py-[14px] my-4 flex flex-col gap-2 text-primary-950 lg:max-w-[500px] xl:max-w-[730px]">
					<div className="flex flex-col gap-[18px] mt-[18px] lg:mt-[14px]">
						<p style={fadeIn(inView, 300)} className="text-title-sm font-title">Butterluxe Tattoo Balm</p>
						<div className="flex flex-col items-start text-body-lg gap-[14px] xl:text-body-xl">
							<p style={fadeIn(inView, 450)}>
								Butterluxe Original Tattoo Balm is a 100% natural,
								fragrance-free formula designed for those who prefer pure,
								uncomplicated aftercare.
							</p>
							<p style={fadeIn(inView, 600)}>
								Give your ink the care it deserves with Butterluxe Original
								Tattoo Balm — a premium tattoo aftercare balm designed to
								hydrate, soothe and protect your skin during every stage of the
								tattoo process.
							</p>
							<a
								style={fadeIn(inView, 750)}
								href="https://www.bluxecare.com/products/original-tattoo-balm?variant=20636773154886"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button tabIndex={-1}>Purchase here</Button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ReccomendedProducts;
