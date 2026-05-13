import { siInstagram, siFacebook } from "simple-icons";
import Button from "../ui/Button";
import { Logo } from "../Logo";
import { navLinks } from "./navlinks";
import Link from "next/link";
import { Icon } from "../ui/Icon";
import { StarAdornment } from "../icons/StarAdornment";
import { MobileMenu } from "./components/MobileMenu";

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
		<nav className="fixed top-0 w-full nav-bg flex items-center justify-center py-[26px] px-[18px] z-100">
			<div className="max-w-[1440px] w-full h-full flex justify-between items-center relative">
				<div className="flex items-center gap-3.5">
					<MobileMenu />
					<div className="hidden md:flex items-center gap-3.5">
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
				</div>
				<Logo className="absolute left-1/2 -translate-x-1/2" />
				<div className="flex items-center gap-3.5">
					<Link href="/contact" className="md:hidden">
						<Button tabIndex={-1}>
							Contact <span className="hidden md:inline">us</span>
						</Button>
					</Link>
					<ul className="hidden md:flex items-center gap-4">
						{navLinks.map((link) => (
							<li
								key={`nav-link-${link.href}`}
								className="flex items-center gap-2"
							>
								<Icon
									icon={StarAdornment}
									size={14}
									className="hidden lg:block"
								/>
								<a
									href={link.href}
									className="text-body-md lg:text-body-lg xl:text-body-xl"
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Nav;
