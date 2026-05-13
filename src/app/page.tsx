import Header from "@/components/layout/Header/Header";
import BorderDivider from "@/components/layout/BorderDivider/BorderDivider";
import FindUs from "./_components/FindUs";

export default function Home() {
	return (
		<main>
			<Header
				images={{
					xl: { src: "/images/home/header-xl.jpg", width: 1920, height: 1080 },
					lg: { src: "/images/home/header-lg.jpg", width: 1240, height: 698 },
					md: { src: "/images/home/header-md.jpg", width: 768, height: 432 },
					sm: { src: "/images/home/header-sm.jpg", width: 448, height: 494 },
				}}
				title="Tattoos from the heart of Sussex"
				subtitle="Lorem ipsum dolor sit amet consectetur. Posuere amet tortor ultricies vestibulum in vitae at. Tellus egestas morbi tempor diam sed. Suspendisse egestas pharetra habitant sit purus blandit metus faucibus sagittis. Consectetur auctor elit sit phasellus a."
				buttonLink="/contact"
				buttonText="Book your visit"
			/>
			<BorderDivider variant="flower" />
			<FindUs />
		</main>
	);
}
