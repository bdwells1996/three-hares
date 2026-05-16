"use client";

import { useEffect, useState } from "react";

const TILE_W = 240;

interface BotanicalBorderProps {
	src: string;
	className?: string;
}

export default function BotanicalBorder({ src, className }: BotanicalBorderProps) {
	const [count, setCount] = useState(8);

	useEffect(() => {
		const update = () =>
			setCount(Math.round(window.innerWidth / TILE_W));
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	return (
		<div className={`flex w-full ${className ?? ""}`} role="presentation">
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
