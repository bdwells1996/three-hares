"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Button from "@/components/ui/Button";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

type InstagramMedia = {
	id: string;
	media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
	media_url: string;
	thumbnail_url?: string;
	permalink: string;
	timestamp: string;
};

export default function InstagramGalleryGrid({
	posts,
	cap,
}: {
	posts: InstagramMedia[];
	cap?: number;
}) {
	const [showMore, setShowMore] = useState(false);
	const gridRef = useRef<HTMLDivElement>(null);
	const { ref: sentinelRef, inView } = useInViewAnimation<HTMLDivElement>();

	// Hide items immediately so they don't flash before the inView animation runs
	useEffect(() => {
		if (!gridRef.current) return;
		const items = gridRef.current.querySelectorAll<HTMLElement>("a");
		gsap.set(items, { opacity: 0, y: 10 });
	}, [showMore]);

	useEffect(() => {
		if (!inView || !gridRef.current) return;
		const items = gridRef.current.querySelectorAll<HTMLElement>("a");
		gsap.fromTo(
			items,
			{ opacity: 0, y: 10 },
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				stagger: 0.15,
				ease: "power2.inOut",
			},
		);
	}, [inView, showMore]);

	const visible = cap && !showMore ? posts.slice(0, cap) : posts;
	const extraRow = cap ? posts.slice(cap, cap + 4) : [];
	const hasMore = cap && !showMore && extraRow.length > 0;

	return (
		<div ref={sentinelRef} className="flex flex-col items-center gap-8 max-w-310 w-full">
			<div ref={gridRef} className="grid grid-cols-1 w-full px-4 sm:grid-cols-2 lg:px-8 lg:grid-cols-3 xl:grid-cols-4 gap-4.5">
				{visible.map((post) => {
					const imageUrl =
						post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url;

					if (!imageUrl) return null;

					return (
						<a
							key={post.id}
							href={post.permalink}
							target="_blank"
							rel="noopener noreferrer"
							className="relative aspect-269/400 overflow-hidden block rounded-lg"
						>
							<Image
								src={imageUrl}
								alt="Instagram post"
								fill
								className="object-cover transition-transform duration-300 hover:scale-105"
								sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
							/>
						</a>
					);
				})}
			</div>
			{hasMore && <Button onClick={() => setShowMore(true)}>See more</Button>}
		</div>
	);
}
