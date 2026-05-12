import { siInstagram, siFacebook } from "simple-icons";
import Button from "../ui/Button";
import { Logo } from "../Logo";
import { navLinks } from "./navlinks";
import Link from "next/link";

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
	return (
		<nav className="fixed top-0 w-full nav-bg flex items-center justify-center py-[26px] px-[18px]">
			<div className="max-w-[1440px] w-full h-full flex justify-between items-center relative">
				<div className="flex items-center gap-[14px]">
					<Link href="/contact">
						<Button tabIndex={-1}>Contact us</Button>
					</Link>
					<a href="https://instagram.com" aria-label="Instagram">
						<SimpleIcon icon={siInstagram} size={21} />
					</a>
					<a href="https://facebook.com" aria-label="Facebook">
						<SimpleIcon icon={siFacebook} size={21} />
					</a>
				</div>
				<Logo className="absolute left-1/2 -translate-x-1/2" />
				<ul className="flex gap-3">
					{navLinks.map((link) => (
						<li key={link.href}>
							<a href={link.href}>{link.label}</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}

export default Nav;
