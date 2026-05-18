import BorderDivider from "@/components/layout/BorderDivider/BorderDivider";
import AftercareInstructions from "./components/AftercareInstructions";
import ThingsToAvoid from "./components/ThingsToAvoid/ThingsToAvoid";
import ReccomendedProducts from "./components/ReccomendedProducts";
import CTABanner from "@/components/ui/CTABanner";

function Aftercare() {
	return (
		<main>
			<section className="flex justify-center bg-secondary-200 px-4 pb-10 pt-30 py-12 md:px-10 md:pt-32 lg:pb-1 xl:pb-18 xl:pt-40">
				<div className="flex flex-col items-center gap-4 max-w-[1240px]">
					<h1 className="text-title-md font-title text-center text-primary-950 lg:text-title-lg xl:text-title-xl">
						Aftercare Instructions
					</h1>
					<p className="text-body-lg text-primary-950 max-w-[800px] text-center xl:text-body-xl">
						Lorem ipsum dolor sit amet consectetur. Posuere amet tortor
						ultricies vestibulum in vitae at. Tellus egestas morbi tempor diam
						sed. Suspendisse egestas pharetra habitant sit purus blandit metus
						faucibus sagittis. Consectetur auctor elit sit phasellus a.
					</p>
				</div>
			</section>
			<BorderDivider variant="botanical-muted" />
			<AftercareInstructions />
			<ThingsToAvoid />
			<ReccomendedProducts />
			<CTABanner
				title="Have any other aftercare questions?"
				buttons={[
					{
						buttonText: "Get in touch",
						buttonLink: "/contact",
					},
				]}
			/>
		</main>
	);
}

export default Aftercare;
