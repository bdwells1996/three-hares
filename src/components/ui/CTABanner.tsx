import Link from "next/link";
import clsx from "clsx";
import Button from "./Button";

interface CTAButton {
	buttonText: string;
	buttonLink: string;
}

interface CTABannerProps {
	title: string;
	buttons: CTAButton[];
	variant?: "primary" | "secondary";
}

function CTABanner({ title, buttons, variant = "primary" }: CTABannerProps) {
	return (
		<div
			className={clsx(
				"flex flex-col items-center gap-7 px-4 py-[34px] lg:py-11",
				variant === "primary" ? "bg-primary-200" : "bg-secondary-200",
			)}
		>
			<h2 className="text-primary-950 font-title text-title-md text-center lg:text-title-lg">
				{title}
			</h2>
			<div className="flex flex-col items-center justify-center gap-4 w-full md:w-auto md:flex-row">
				{buttons.map((btn) => (
					<Link
						key={btn.buttonLink}
						href={btn.buttonLink}
						className="w-full md:w-auto"
					>
						<Button className="w-full text-[24px] md:w-auto lg:text-title-sm">
							{btn.buttonText}
						</Button>
					</Link>
				))}
			</div>
		</div>
	);
}

export default CTABanner;
