import { createClient } from "@sanity/client";

const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
	apiVersion: "2026-05-16",
	token: process.env.SANITY_API_WRITE_TOKEN,
	useCdn: false,
});

async function seed() {
	console.log("Seeding Instagram Settings document to Sanity...");

	const accounts = [];

	if (process.env.INSTAGRAM_ACCESS_TOKEN_SHOP) {
		accounts.push({
			_key: "shop",
			name: "Shop",
			accessToken: process.env.INSTAGRAM_ACCESS_TOKEN_SHOP,
			lastRefreshed: new Date().toISOString(),
		});
		console.log("  ✓ Found Shop token in .env.local");
	}

	if (process.env.INSTAGRAM_ACCESS_TOKEN_NIKKI) {
		accounts.push({
			_key: "nikki",
			name: "Nikki",
			accessToken: process.env.INSTAGRAM_ACCESS_TOKEN_NIKKI,
			lastRefreshed: new Date().toISOString(),
		});
		console.log("  ✓ Found Nikki token in .env.local");
	}

	if (process.env.INSTAGRAM_ACCESS_TOKEN_PETE) {
		accounts.push({
			_key: "pete",
			name: "Pete",
			accessToken: process.env.INSTAGRAM_ACCESS_TOKEN_PETE,
			lastRefreshed: new Date().toISOString(),
		});
		console.log("  ✓ Found Pete token in .env.local");
	}

	if (!accounts.length) {
		console.warn("⚠️ No Instagram tokens found in environment variables.");
		return;
	}

	await client.createOrReplace({
		_id: "instagramSettings",
		_type: "instagramSettings",
		adminNotice:
			"AUTOMATED TOKEN MANAGEMENT ACTIVE: Instagram tokens are refreshed automatically by a scheduled cron job every 30 days. Do NOT change, replace, or delete these tokens manually, as doing so will break the refresh cycle and disconnect the Instagram feed.",
		accounts,
	});

	console.log("✓ Done. Instagram Settings initialized in Sanity.");
}

seed().catch(console.error);
