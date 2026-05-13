type BorderVariant = "flower";

type BorderDividerProps = {
	variant: BorderVariant;
};

const variantSources: Record<
	BorderVariant,
	{ breakpoint: string; src: string; width: number; height: number }[]
> = {
	flower: [
		{
			breakpoint: "(max-width: 448px)",
			src: "/images/borders/flower-border/flower-border-sm.svg",
			width: 448,
			height: 40,
		},
		{
			breakpoint: "(max-width: 768px)",
			src: "/images/borders/flower-border/flower-border-md.svg",
			width: 768,
			height: 40,
		},
		{
			breakpoint: "(max-width: 1240px)",
			src: "/images/borders/flower-border/flower-border-lg.svg",
			width: 1240,
			height: 40,
		},
		{
			breakpoint: "(max-width: 1440px)",
			src: "/images/borders/flower-border/flower-border-xl.svg",
			width: 1440,
			height: 40,
		},
		{
			breakpoint: "(max-width: 1920px)",
			src: "/images/borders/flower-border/flower-border-xxl.svg",
			width: 1920,
			height: 40,
		},
	],
};

const variantDefault: Record<BorderVariant, string> = {
	flower: "/images/borders/flower-border/flower-border-xxl.svg",
};

export default function BorderDivider({ variant }: BorderDividerProps) {
	const sources = variantSources[variant];
	const fallback = variantDefault[variant];

	return (
		<picture className="block w-full">
			{sources.map(({ breakpoint, src }) => (
				<source key={breakpoint} media={breakpoint} srcSet={src} />
			))}
			<img
				src={fallback}
				alt=""
				role="presentation"
				className="w-full h-auto"
			/>
		</picture>
	);
}
