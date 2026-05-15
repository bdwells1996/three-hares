"use client";

import { useEffect, useState } from "react";

const TILE_W = 240;

export default function BotanicalBorder() {
	const [count, setCount] = useState(8);

	useEffect(() => {
		const update = () =>
			setCount(Math.round(window.innerWidth / TILE_W));
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	return (
		<div className="flex w-full" role="presentation">
			{Array.from({ length: count }).map((_, i) => (
				<img
					key={i}
					src="/images/borders/botanical-border/botanical-border.svg"
					style={{ width: `${100 / count}%` }}
					alt=""
				/>
			))}
		</div>
	);
}
