"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siInstagram, siFacebook } from "simple-icons";
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

type MenuState = "closed" | "opening" | "open" | "closing";

export function MobileMenu() {
	const [state, setState] = useState<MenuState>("closed");

	const open = () => setState("opening");
	const close = () => setState("closing");
	const onTransitionEnd = () => {
		if (state === "closing") setState("closed");
	};

	useEffect(() => {
		if (state === "opening") {
			const raf = requestAnimationFrame(() => setState("open"));
			return () => cancelAnimationFrame(raf);
		}
	}, [state]);

	const visible = state === "open";

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

			{state !== "closed" && (
				<div
					onTransitionEnd={onTransitionEnd}
					style={{
						transition: "opacity 300ms cubic-bezier(0.42, 0, 0.58, 1)",
						opacity: visible ? 1 : 0,
					}}
					className="fixed inset-0 z-50 flex flex-col bg-primary-500 px-[18px] pt-[26px] pb-10"
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
