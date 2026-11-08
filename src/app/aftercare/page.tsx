import BorderDivider from "@/components/layout/BorderDivider/BorderDivider";
import AftercareInstructions from "./components/AftercareInstructions";
import ThingsToAvoid from "./components/ThingsToAvoid/ThingsToAvoid";
import ReccomendedProducts from "./components/ReccomendedProducts";
import CTABanner from "@/components/ui/CTABanner";
import PageHeader from "@/components/layout/PageHeader/PageHeader";

function Aftercare() {
	return (
		<main>
			<section className="flex justify-center bg-secondary-200 px-4 pb-10 pt-30 py-12 md:px-10 md:pt-32 lg:pb-1 xl:pb-18 xl:pt-40">
				<PageHeader title="Aftercare Instructions" />
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
