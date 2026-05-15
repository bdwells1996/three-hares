"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "@/components/ui/Button";

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

	const visible =
		cap && !showMore ? posts.slice(0, cap) : posts;
	const extraRow = cap ? posts.slice(cap, cap + 4) : [];
	const hasMore = cap && !showMore && extraRow.length > 0;

	return (
		<div className="flex flex-col items-center gap-6 max-w-310 w-full">
			<div className="grid grid-cols-1 w-full px-4 sm:grid-cols-2 lg:px-8 lg:grid-cols-3 xl:grid-cols-4 gap-4.5">
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
			{hasMore && (
				<Button onClick={() => setShowMore(true)}>See more</Button>
			)}
		</div>
	);
}
