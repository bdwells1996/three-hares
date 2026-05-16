"use client";

import { useEffect, useState } from "react";

const TILE_W = 240;

interface BotanicalBorderProps {
	variant?: "default" | "muted";
}

export default function BotanicalBorder({ variant = "default" }: BotanicalBorderProps) {
	const [count, setCount] = useState(8);

	useEffect(() => {
		const update = () =>
			setCount(Math.round(window.innerWidth / TILE_W));
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	const src = variant === "muted"
		? "/images/borders/botanical-border/botanical-border-muted.svg"
		: "/images/borders/botanical-border/botanical-border.svg";

	return (
		<div className="flex w-full" role="presentation">
			{Array.from({ length: count }).map((_, i) => (
				<img
					key={i}
					src={src}
					style={{ width: `${100 / count}%` }}
					alt=""
				/>
			))}
		</div>
	);
}
