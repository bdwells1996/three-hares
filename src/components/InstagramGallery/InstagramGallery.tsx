import Image from "next/image";

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

export default async function InstagramGallery() {
	const token = process.env.INSTAGRAM_ACCESS_TOKEN_BEN;

	if (!token) return null;

	const posts = await fetchInstagramFeed(token);

	if (!posts.length)
		return (
			<section className="px-4 bg-primary-300 flex justify-center pb-12">
				<h3 className="text-center text-title-sm text-primary-950">
					Check back soon when we have more work to show!
				</h3>
			</section>
		);

	return (
		<section className="px-4 bg-primary-300 flex justify-center pb-12">
			<div className="grid grid-cols-1 max-w-[1240px] w-full px-4 sm:grid-cols-2 lg:px-8 lg:grid-cols-3 xl:grid-cols-4 gap-4.5">
				{posts.map((post) => {
					const imageUrl =
						post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url;

					if (!imageUrl) return null;

					return (
						<a
							key={post.id}
							href={post.permalink}
							target="_blank"
							rel="noopener noreferrer"
							className="relative aspect-[269/400] overflow-hidden block rounded-lg"
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
		</section>
	);
}
