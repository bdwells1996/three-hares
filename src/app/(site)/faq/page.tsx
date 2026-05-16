import Accordion from "@/components/ui/Accordion";
import CTABanner from "@/components/ui/CTABanner";
import BorderDivider from "@/components/layout/BorderDivider/BorderDivider";
import { client } from "@/sanity/lib/client";
import { faqQuery } from "@/sanity/lib/queries";
import type { PortableTextBlock } from "@portabletext/react";

export const revalidate = 60;

interface FaqItem {
	_id: string;
	question: string;
	answer: PortableTextBlock[];
}

async function Page() {
	const items: FaqItem[] = await client.fetch(faqQuery);

	return (
		<main>
			<section className="flex justify-center bg-secondary-200 px-4 pb-10 pt-30 py-12 md:px-10 md:pt-32 lg:pb-1 xl:pb-18 xl:pt-40">
				<div className="flex flex-col items-center gap-4 max-w-[1240px]">
					<h1 className="text-title-md font-title text-center text-primary-950 lg:text-title-lg xl:text-title-xl">
						Frequently asked questions
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
			<section className="flex justify-center py-12 bg-secondary-200 md:px-6 md:py-10">
				<div className="w-full max-w-[800px]">
					<Accordion items={items} />
				</div>
			</section>
			<span className="block -my-px">
				<BorderDivider variant="botanical-muted" flipped={true} />
			</span>
			<CTABanner
				title="Don't see an answer to your question?"
				buttons={[
					{
						buttonText: "Contact us",
						buttonLink: "/contact",
					},
				]}
			/>
		</main>
	);
}

export default Page;
