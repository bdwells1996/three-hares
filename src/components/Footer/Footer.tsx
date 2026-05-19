import Link from "next/link";
import Button from "../ui/Button";
import { siInstagram, siFacebook } from "simple-icons";
import { navLinks } from "../Nav/navlinks";

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

function Footer() {
	return (
		<footer className="pattern-overlay bg-primary-500 flex items-center justify-center px-6 py-4 md:px-8 md:py-6">
			<div className="flex flex-col w-full max-w-[1240px] gap-5 md:flex-row-reverse md:justify-between md:items-start">
				<div className="flex flex-col items-center gap-5 md:items-start">
					<h4 className="font-title text-[22px] md:text-body-xl">
						Useful Links
					</h4>
					<ul className="flex flex-wrap items-center justify-center gap-4">
						{navLinks.map((link) => (
							<li
								key={`nav-link-${link.href}`}
								className="flex items-center gap-2"
							>
								<a href={link.href} className="ttext-body-lg">
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</div>
				<div className="flex flex-col items-center gap-6 md:gap-8 md:items-start">
					<div className="flex items-center gap-3.5">
						<Link href="/contact" className="font-title text-body-xl">
							Contact us
						</Link>
						<a href="https://instagram.com" aria-label="Instagram">
							<SimpleIcon icon={siInstagram} size={21} />
						</a>
						<a href="https://facebook.com" aria-label="Facebook">
							<SimpleIcon icon={siFacebook} size={21} />
						</a>
					</div>
					<p className="text-body-sm">
						Copyright Three Hares {new Date().getFullYear()}©
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
