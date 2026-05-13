import Button from "@/components/ui/Button";
import { getImageProps } from "next/image";
import Link from "next/link";

type ResponsiveImage = {
	src: string;
	width: number;
	height: number;
};

type HeaderProps = {
	images: {
		xl: ResponsiveImage;
		lg: ResponsiveImage;
		md: ResponsiveImage;
		sm: ResponsiveImage;
	};
	title: string;
	subtitle?: string;
	buttonLink?: string;
	buttonText?: string;
};

export default function Header({ images, title, subtitle, buttonLink, buttonText }: HeaderProps) {
	const common = { alt: "Header", sizes: "100vw", priority: true };

	const { props: xlProps } = getImageProps({ ...common, ...images.xl });
	const { props: lgProps } = getImageProps({ ...common, ...images.lg });
	const { props: mdProps } = getImageProps({ ...common, ...images.md });
	const { props: smProps } = getImageProps({ ...common, ...images.sm });

	return (
		<header className="h-svh w-full flex relative justify-center items-center">
			<picture className="absolute inset-0 -z-1">
				<source media="(max-width: 448px)" srcSet={smProps.srcSet} />
				<source media="(max-width: 768px)" srcSet={mdProps.srcSet} />
				<source media="(max-width: 1240px)" srcSet={lgProps.srcSet} />
				<img {...xlProps} alt="hares-header" className="w-full h-full object-cover" />
			</picture>
			<div className="max-w-[885px] w-full px-6 flex flex-col items-center gap-4 text-center md:px-14">
				<h1 className="text-title-lg font-title lg:text-title-xl">{title}</h1>
				<div className="flex flex-col items-center gap-7">
					{subtitle && <p className="text-body-xl font-body">{subtitle}</p>}
					{buttonLink && buttonText && (
						<Link href={buttonLink}>
							<Button className="text-[20px] px-6" tabIndex={-1}>
								{buttonText}
							</Button>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}
