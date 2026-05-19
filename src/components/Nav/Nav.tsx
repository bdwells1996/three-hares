"use client";

import { siInstagram, siTiktok } from "simple-icons";
import Button from "../ui/Button";
import { navLinks } from "./navlinks";
import Link from "next/link";
import { Icon } from "../ui/Icon";
import { StarAdornment } from "../icons/StarAdornment";
import { MobileMenu } from "./components/MobileMenu";
import { ScrollLogo } from "./components/ScrollLogo";
import { useEffect, useState } from "react";
import { useAnimation } from "@/context/AnimationContext";

function SimpleIcon({
	icon,
	size = 20,
}: {
	icon: { path: string; title: string };
	size?: number;
}) {
	return (
		<svg
			role="img"
			viewBox="0 0 24 24"
			width={size}
			height={size}
			fill="currentColor"
			aria-label={icon.title}
		>
			<path d={icon.path} />
		</svg>
	);
}

function Nav() {
	const [scrolled, setScrolled] = useState(false);
	const { isReady } = useAnimation();

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 0);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<nav
			style={{
				opacity: isReady ? 1 : 0,
				transition: isReady ? "opacity 0.5s ease" : "none",
			}}
			className={`fixed top-0 w-full flex items-center justify-center py-[26px] pl-[18px] pr-[22px] z-100 nav-bg${scrolled ? " nav-bg--scrolled" : ""}`}
		>
			<div className="max-w-[1440px] w-full h-full flex justify-between items-center relative">
				<div className="flex items-center gap-3.5">
					<MobileMenu />
					<div className="hidden md:flex items-center gap-3.5">
						<Link href="/contact">
							<Button tabIndex={-1}>Contact us</Button>
						</Link>
						<a
							href="https://instagram.com"
							aria-label="Instagram"
							className="hover:text-primary-400 transition-colors duration-300"
						>
							<SimpleIcon icon={siInstagram} size={21} />
						</a>
						<a
							href="https://facebook.com"
							aria-label="Facebook"
							className="hover:text-primary-400 transition-colors duration-300"
						>
							<SimpleIcon icon={siTiktok} size={21} />
						</a>
					</div>
				</div>
				<ScrollLogo className="absolute left-1/2 -translate-x-1/2" />
				<div className="flex items-center gap-3.5">
					<Link href="/contact" className="md:hidden">
						<Button tabIndex={-1}>
							Contact <span className="hidden md:inline">us</span>
						</Button>
					</Link>
					<ul className="hidden md:flex items-center gap-4">
						{navLinks.map((link) => (
							<li key={`nav-link-${link.href}`}>
								<Link
									href={link.href}
									className="text-body-lg xl:text-body-xl flex items-center gap-2 group hover:text-primary-400 transition-colors duration-300"
								>
									<Icon
										icon={StarAdornment}
										size={14}
										className="hidden lg:block group-hover:rotate-90 transition-transform duration-300"
									/>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Nav;
