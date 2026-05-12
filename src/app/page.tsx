import { getImageProps } from "next/image";

export default function Home() {
	const common = { alt: "Header", sizes: "100vw", priority: true };

	const { props: xlProps } = getImageProps({
		...common,
		src: "/images/home/header-xl.jpg",
		width: 1920,
		height: 1080,
	});
	const { props: lgProps } = getImageProps({
		...common,
		src: "/images/home/header-lg.jpg",
		width: 1240,
		height: 698,
	});
	const { props: mdProps } = getImageProps({
		...common,
		src: "/images/home/header-md.jpg",
		width: 768,
		height: 432,
	});
	const { props: smProps } = getImageProps({
		...common,
		src: "/images/home/header-sm.jpg",
		width: 448,
		height: 494,
	});

	return (
		<main>
			<header className="h-svh w-full">
				<picture>
					<source media="(max-width: 448px)" srcSet={smProps.srcSet} />
					<source media="(max-width: 768px)" srcSet={mdProps.srcSet} />
					<source media="(max-width: 1240px)" srcSet={lgProps.srcSet} />
					<img
						{...xlProps}
						alt="hares-header"
						className="w-full h-full object-cover"
					/>
				</picture>
			</header>
		</main>
	);
}
