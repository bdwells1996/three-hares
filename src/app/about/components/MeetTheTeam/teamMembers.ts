export interface TeamMember {
	name: string;
	role: string;
	image: string;
	pronouns: string;
	buttonText: string;
	buttonLink: string;
	description: string;
	direction: "left" | "right";
}

export const teamMembers: TeamMember[] = [
	{
		name: "Nikki",
		role: "Resident Artist",
		image: "/images/team/remi-test.jpg",
		pronouns: "She/Her/Hers",
		buttonText: "See Nikki's work",
		buttonLink: "nikki",
		description:
			"Lorem ipsum dolor sit amet consectetur. Pharetra aliquam dui sit id sit donec sem in turpis. Laoreet laoreet eget tincidunt porttitor. Interdum commodo tortor id nulla nisi nulla eget lacus auctor. Pretium sit tempor imperdiet urna neque semper proin venenatis. Elementum nibh enim nec massa erat. Vestibulum sapien arcu et amet nisl hac egestas ipsum. Sapien augue in et nullam tellus cras mauris tincidunt placerat. Ut sit etiam nec enim enim tortor vitae sed faucibus. Mi nulla purus dui vitae. Lectus ridiculus bibendum aliquet morbi ipsum ultricies. Adipiscing sed arcu vulputate elit. Auctor tincidunt pharetra turpis elementum at magna cursus. Mattis pellentesque nunc ut volutpat mi sagittis nulla consectetur ornare. Dictum fringilla quisque orci aliquet vel tortor erat urna. ",
		direction: "left",
	},
	{
		name: "Pete",
		role: "Resident Artist",
		image: "/images/team/remi-test.jpg",
		pronouns: "He/Him/His",
		buttonText: "See Pete's work",
		buttonLink: "pete",
		description:
			"Lorem ipsum dolor sit amet consectetur. Pharetra aliquam dui sit id sit donec sem in turpis. Laoreet laoreet eget tincidunt porttitor. Interdum commodo tortor id nulla nisi nulla eget lacus auctor. Pretium sit tempor imperdiet urna neque semper proin venenatis. Elementum nibh enim nec massa erat. Vestibulum sapien arcu et amet nisl hac egestas ipsum. Sapien augue in et nullam tellus cras mauris tincidunt placerat. Ut sit etiam nec enim enim tortor vitae sed faucibus. Mi nulla purus dui vitae. Lectus ridiculus bibendum aliquet morbi ipsum ultricies. Adipiscing sed arcu vulputate elit. Auctor tincidunt pharetra turpis elementum at magna cursus. Mattis pellentesque nunc ut volutpat mi sagittis nulla consectetur ornare. Dictum fringilla quisque orci aliquet vel tortor erat urna. ",
		direction: "right",
	},
	{
		name: "Harley",
		role: "Studio Manager",
		image: "/images/team/remi-test.jpg",
		pronouns: "They/Them/Theirs",
		buttonText: "Contact us",
		buttonLink: "/contact",
		description:
			"Lorem ipsum dolor sit amet consectetur. Pharetra aliquam dui sit id sit donec sem in turpis. Laoreet laoreet eget tincidunt porttitor. Interdum commodo tortor id nulla nisi nulla eget lacus auctor. Pretium sit tempor imperdiet urna neque semper proin venenatis. Elementum nibh enim nec massa erat. Vestibulum sapien arcu et amet nisl hac egestas ipsum. Sapien augue in et nullam tellus cras mauris tincidunt placerat. Ut sit etiam nec enim enim tortor vitae sed faucibus. Mi nulla purus dui vitae. Lectus ridiculus bibendum aliquet morbi ipsum ultricies. Adipiscing sed arcu vulputate elit. Auctor tincidunt pharetra turpis elementum at magna cursus. Mattis pellentesque nunc ut volutpat mi sagittis nulla consectetur ornare. Dictum fringilla quisque orci aliquet vel tortor erat urna. ",
		direction: "left",
	},
];
