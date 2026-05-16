import BotanicalBorder from "./BotanicalBorder";

type BorderVariant = "flower" | "botanical" | "botanical-muted";

type BorderDividerProps = {
	variant: BorderVariant;
	flipped?: boolean;
};

const variantSources: Partial<
	Record<
		BorderVariant,
		{ breakpoint: string; src: string; width: number; height: number }[]
	>
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
	botanical: "/images/borders/botanical-border/botanical-border.svg",
	"botanical-muted": "/images/borders/botanical-border/botanical-border-muted.svg",
};

export default function BorderDivider({ variant, flipped }: BorderDividerProps) {
	const flipClass = flipped ? "rotate-180" : "";

	if (variant === "botanical" || variant === "botanical-muted") {
		return <BotanicalBorder src={variantDefault[variant]} className={flipClass} />;
	}

	const sources = variantSources[variant];
	const fallback = variantDefault[variant];

	return (
		<picture className={`block w-full ${flipClass}`}>
			{sources?.map(({ breakpoint, src }) => (
				<source key={breakpoint} media={breakpoint} srcSet={src} />
			))}
			<img src={fallback} alt="" className="w-full h-auto" />
		</picture>
	);
}
