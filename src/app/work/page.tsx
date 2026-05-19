import InstagramGallery from "@/components/InstagramGallery/InstagramGallery";
import BorderDivider from "@/components/layout/BorderDivider/BorderDivider";
import HaresBorder from "@/components/layout/HaresBorder/HaresBorder";
import CTABanner from "@/components/ui/CTABanner";
import PageHeader from "@/components/layout/PageHeader/PageHeader";

const buttonConfig = [
	{
		buttonText: "See more work",
		buttonLink: "/work",
	},
	{
		buttonText: "Contact us",
		buttonLink: "/contact",
	},
];

function page() {
	return (
		<main className="relative">
			<section className="flex justify-center bg-secondary-200 px-4 pb-12 pt-30 py-12 md:px-10 md:pt-32 lg:pb-16 xl:pb-24 xl:pt-40">
				<PageHeader
					title="Take a look at some of our work"
					subtitle="Lorem ipsum dolor sit amet consectetur. Posuere amet tortor ultricies vestibulum in vitae at. Tellus egestas morbi tempor diam sed. Suspendisse egestas pharetra habitant sit purus blandit metus faucibus sagittis. Consectetur auctor elit sit phasellus a."
					titleClassName="text-primary-800"
					subtitleClassName="text-primary-800"
				/>
			</section>
			<span className="block -mb-px">
				<BorderDivider variant="botanical" />
			</span>
			<InstagramGallery className="py-2 lg:py-8" variant="secondary" cap={12} />
			<span className="block -mt-px -mb-px">
				<BorderDivider variant="botanical" />
			</span>
			<HaresBorder
				className="bg-transparent opacity-10 absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none z-0"
				scale={4}
				parallaxStrength={0.05}
			/>
			<CTABanner
				title="Like what you see?"
				buttons={buttonConfig}
				variant="primary"
			/>
		</main>
	);
}

export default page;
