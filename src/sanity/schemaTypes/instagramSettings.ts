import { defineArrayMember, defineField, defineType } from "sanity";

export const instagramSettings = defineType({
	name: "instagramSettings",
	title: "Instagram Settings",
	type: "document",
	fields: [
		defineField({
			name: "adminNotice",
			title: "⚠️ CRITICAL: DO NOT MANUALLY EDIT TOKENS",
			type: "string",
			readOnly: true,
			initialValue:
				"AUTOMATED TOKEN MANAGEMENT ACTIVE: Instagram tokens are refreshed automatically by a scheduled cron job every 30 days. Do NOT change, replace, or delete these tokens manually, as doing so will break the refresh cycle and disconnect the Instagram feed.",
			description:
				"This document is managed automatically in the background. Only paste a token here if you are adding a brand-new artist account or re-authenticating an account from scratch.",
		}),
		defineField({
			name: "accounts",
			title: "Instagram Accounts",
			description:
				"Connected artist and studio Instagram feeds. Tokens are automatically renewed every 30 days by cron.",
			type: "array",
			of: [
				defineArrayMember({
					type: "object",
					name: "instagramAccount",
					title: "Instagram Account",
					fields: [
						defineField({
							name: "name",
							title: "Account Identifier",
							type: "string",
							description:
								"e.g. Nikki, Pete, Shop (used to identify whose feed this belongs to)",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "accessToken",
							title: "Instagram Access Token",
							type: "string",
							description:
								"⚠️ DO NOT EDIT: Automatically renewed every 30 days. Manual changes will invalidate the token and break the feed.",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "lastRefreshed",
							title: "Last Auto-Refreshed At",
							type: "datetime",
							readOnly: true,
							description:
								"Timestamp of the most recent automated refresh via cron.",
						}),
					],
					preview: {
						select: {
							title: "name",
							date: "lastRefreshed",
						},
						prepare({ title, date }) {
							return {
								title: title ? `Instagram: ${title}` : "Unnamed Account",
								subtitle: date
									? `Last refreshed: ${new Date(date).toLocaleDateString()}`
									: "Pending first automated refresh",
							};
						},
					},
				}),
			],
		}),
	],
	preview: {
		prepare() {
			return {
				title: "Instagram Settings",
				subtitle: "Automated token refresh active",
			};
		},
	},
});
