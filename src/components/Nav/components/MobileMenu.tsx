"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { siInstagram, siFacebook } from "simple-icons";
import gsap from "gsap";
import { navLinks } from "../navlinks";
import { Icon } from "../../ui/Icon";
import { StarAdornment } from "../../icons/StarAdornment";

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

export function MobileMenu() {
	const [mounted, setMounted] = useState(false);
	const overlayRef = useRef<HTMLDivElement>(null);
	const tlRef = useRef<gsap.core.Tween | null>(null);

	const open = () => {
		setMounted(true);
	};

	const close = () => {
		tlRef.current = gsap.to(overlayRef.current, {
			opacity: 0,
			duration: 0.3,
			ease: "cubic-bezier(0.65,0.05,0.36,1)",
			onComplete: () => setMounted(false),
		});
	};

	const onMount = (node: HTMLDivElement | null) => {
		if (!node) return;
		(overlayRef as React.MutableRefObject<HTMLDivElement>).current = node;
		tlRef.current?.kill();
		gsap.fromTo(node, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "cubic-bezier(0.65,0.05,0.36,1)" });
	};

	return (
		<>
			<button
				type="button"
				onClick={open}
				aria-label="Open menu"
				className="cursor-pointer p-1 md:hidden"
			>
				<Menu size={24} />
			</button>

			{mounted && (
				<div
					ref={onMount}
					className="fixed inset-0 z-50 flex flex-col bg-primary-500 px-4.5 pt-6.5 pb-10"
				>
					<div className="flex items-center justify-between">
						<button
							type="button"
							onClick={close}
							aria-label="Close menu"
							className="cursor-pointer p-1"
						>
							<X size={24} />
						</button>
						<div className="flex items-center gap-3.5">
							<a href="https://instagram.com" aria-label="Instagram">
								<SimpleIcon icon={siInstagram} size={21} />
							</a>
							<a href="https://facebook.com" aria-label="Facebook">
								<SimpleIcon icon={siFacebook} size={21} />
							</a>
						</div>
					</div>

					<ul className="flex flex-col gap-6 mt-10">
						{navLinks.map((link) => (
							<li
								key={`mobile-nav-link-${link.href}`}
								className="flex items-center gap-3"
							>
								<Icon icon={StarAdornment} size={14} />
								<a
									href={link.href}
									onClick={close}
									className="text-title-sm font-title"
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
}
