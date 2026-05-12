import type { Metadata } from "next";
import { Josefin_Sans, Yeseva_One } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav/Nav";

const yesevaOne = Yeseva_One({
	variable: "--font-yeseva-one",
	weight: "400",
	subsets: ["latin"],
});

const josefinSans = Josefin_Sans({
	variable: "--font-josefin-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Three Hares",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${yesevaOne.variable} ${josefinSans.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<Nav />
				{children}
			</body>
		</html>
	);
}
