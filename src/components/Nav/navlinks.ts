export interface NavLink {
	label: string;
	href: string;
}

export const navLinks: NavLink[] = [
	{ label: "About", href: "/about" },
	{ label: "Our Work", href: "/work" },
	{ label: "Contact Us", href: "/contact" },
	{ label: "Aftercare", href: "/aftercare" },
	{ label: "FAQ", href: "/faq" },
];
