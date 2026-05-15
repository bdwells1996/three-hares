import InstagramGallery from "@/components/InstagramGallery/InstagramGallery";
import BorderDivider from "@/components/layout/BorderDivider/BorderDivider";
import HaresBorder from "@/components/layout/HaresBorder/HaresBorder";
import CTABanner from "@/components/ui/CTABanner";

const buttonConfig = [
	{
		buttonText: "See more work",
		buttonLink: "/our-work",
	},
	{
		buttonText: "Contact us",
		buttonLink: "/contact",
	},
];

function page() {
	return (
		<main className="relative">
			<section className="flex justify-center bg-primary-200 px-4 pb-12 pt-30 py-12 md:px-10 md:pt-32 lg:pb-16 xl:pb-24 xl:pt-40">
				<div className="flex flex-col items-center gap-4 max-w-[1240px]">
					<h1 className="text-title-md font-title text-center text-primary-800 lg:text-title-lg xl:text-title-xl">
						Take a look at some of our work
					</h1>
					<p className="text-body-lg text-primary-700 max-w-[800px] text-center xl:text-body-xl">
						Lorem ipsum dolor sit amet consectetur. Posuere amet tortor
						ultricies vestibulum in vitae at. Tellus egestas morbi tempor diam
						sed. Suspendisse egestas pharetra habitant sit purus blandit metus
						faucibus sagittis. Consectetur auctor elit sit phasellus a.
					</p>
				</div>
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
