import type { Metadata } from "next";
import localFont from "next/font/local";
import { Josefin_Sans } from "next/font/google";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import { AnimationProvider } from "@/context/AnimationContext";
import "./globals.css";

const vineyard = localFont({
	src: "../../public/fonts/VineyardRegular.woff2",
	variable: "--font-vineyard",
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
			className={`${vineyard.variable} ${josefinSans.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<AnimationProvider>
					<LoadingScreen />
					<Nav />
					{children}
					<Footer />
				</AnimationProvider>
			</body>
		</html>
	);
}
