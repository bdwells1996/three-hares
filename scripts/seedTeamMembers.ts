import { createClient } from "@sanity/client";

const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
	apiVersion: "2026-05-16",
	token: process.env.SANITY_API_WRITE_TOKEN,
	useCdn: false,
});

// Images are not seeded — upload them via the Studio after running this script.
const teamMembers = [
	{
		name: "Nikki",
		role: "Resident Artist",
		pronouns: "She/Her/Hers",
		buttonText: "See Nikki's work",
		buttonLink: "/about/nikki",
		description:
			"Lorem ipsum dolor sit amet consectetur. Pharetra aliquam dui sit id sit donec sem in turpis. Laoreet laoreet eget tincidunt porttitor. Interdum commodo tortor id nulla nisi nulla eget lacus auctor. Pretium sit tempor imperdiet urna neque semper proin venenatis. Elementum nibh enim nec massa erat. Vestibulum sapien arcu et amet nisl hac egestas ipsum. Sapien augue in et nullam tellus cras mauris tincidunt placerat. Ut sit etiam nec enim enim tortor vitae sed faucibus. Mi nulla purus dui vitae. Lectus ridiculus bibendum aliquet morbi ipsum ultricies. Adipiscing sed arcu vulputate elit. Auctor tincidunt pharetra turpis elementum at magna cursus. Mattis pellentesque nunc ut volutpat mi sagittis nulla consectetur ornare. Dictum fringilla quisque orci aliquet vel tortor erat urna.",
		direction: "left",
		order: 1,
	},
	{
		name: "Pete",
		role: "Resident Artist",
		pronouns: "He/Him/His",
		buttonText: "See Pete's work",
		buttonLink: "/about/pete",
		description:
			"Lorem ipsum dolor sit amet consectetur. Pharetra aliquam dui sit id sit donec sem in turpis. Laoreet laoreet eget tincidunt porttitor. Interdum commodo tortor id nulla nisi nulla eget lacus auctor. Pretium sit tempor imperdiet urna neque semper proin venenatis. Elementum nibh enim nec massa erat. Vestibulum sapien arcu et amet nisl hac egestas ipsum. Sapien augue in et nullam tellus cras mauris tincidunt placerat. Ut sit etiam nec enim enim tortor vitae sed faucibus. Mi nulla purus dui vitae. Lectus ridiculus bibendum aliquet morbi ipsum ultricies. Adipiscing sed arcu vulputate elit. Auctor tincidunt pharetra turpis elementum at magna cursus. Mattis pellentesque nunc ut volutpat mi sagittis nulla consectetur ornare. Dictum fringilla quisque orci aliquet vel tortor erat urna.",
		direction: "right",
		order: 2,
	},
	{
		name: "Harley",
		role: "Studio Manager",
		pronouns: "They/Them/Theirs",
		buttonText: "Contact us",
		buttonLink: "/contact",
		description:
			"Lorem ipsum dolor sit amet consectetur. Pharetra aliquam dui sit id sit donec sem in turpis. Laoreet laoreet eget tincidunt porttitor. Interdum commodo tortor id nulla nisi nulla eget lacus auctor. Pretium sit tempor imperdiet urna neque semper proin venenatis. Elementum nibh enim nec massa erat. Vestibulum sapien arcu et amet nisl hac egestas ipsum. Sapien augue in et nullam tellus cras mauris tincidunt placerat. Ut sit etiam nec enim enim tortor vitae sed faucibus. Mi nulla purus dui vitae. Lectus ridiculus bibendum aliquet morbi ipsum ultricies. Adipiscing sed arcu vulputate elit. Auctor tincidunt pharetra turpis elementum at magna cursus. Mattis pellentesque nunc ut volutpat mi sagittis nulla consectetur ornare. Dictum fringilla quisque orci aliquet vel tortor erat urna.",
		direction: "left",
		order: 3,
	},
];

async function seed() {
	console.log("Seeding team members...");
	for (const member of teamMembers) {
		await client.create({
			_type: "teamMember",
			...member,
		});
		console.log(`  ✓ ${member.name} (${member.role})`);
	}
	console.log("Done. Remember to upload photos for each member in the Studio.");
}

seed().catch(console.error);
