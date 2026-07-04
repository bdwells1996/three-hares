import clsx from "clsx";
import InstagramGalleryGrid from "./InstagramGalleryGrid";

type InstagramMedia = {
	id: string;
	media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
	media_url: string;
	thumbnail_url?: string;
	permalink: string;
	timestamp: string;
};

type InstagramFeedResponse = {
	data: InstagramMedia[];
};

async function fetchInstagramFeed(token: string): Promise<InstagramMedia[]> {
	const res = await fetch(
		`https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${token}`,
		{ next: { revalidate: 3600 } },
	);

	if (!res.ok) return [];

	const json: InstagramFeedResponse = await res.json();
	return json.data ?? [];
}

function interlace(feeds: InstagramMedia[][]): InstagramMedia[] {
	const result: InstagramMedia[] = [];
	const max = Math.max(...feeds.map((f) => f.length));
	for (let i = 0; i < max; i++) {
		for (const feed of feeds) {
			if (i < feed.length) result.push(feed[i]);
		}
	}
	return result;
}

export default async function InstagramGallery({
	variant = "primary",
	className,
	cap,
}: {
	variant?: "primary" | "secondary";
	className?: string;
	cap?: number;
}) {
	const tokens = [process.env.INSTAGRAM_ACCESS_TOKEN_NIKKI].filter(
		Boolean,
	) as string[];

	if (!tokens.length) return null;

	const feeds = await Promise.all(tokens.map(fetchInstagramFeed));
	const posts = feeds.length === 1 ? feeds[0] : interlace(feeds);

	const sectionClass = clsx(
		"px-4 flex justify-center pb-12",
		variant === "primary" ? "bg-primary-300" : "bg-secondary-200",
		className,
	);

	if (!posts.length)
		return (
			<section className={sectionClass}>
				<h3 className="text-center text-title-sm text-primary-950">
					Check back soon when we have more work to show!
				</h3>
			</section>
		);

	return (
		<section className={sectionClass}>
			<InstagramGalleryGrid posts={posts} cap={cap} />
		</section>
	);
}
