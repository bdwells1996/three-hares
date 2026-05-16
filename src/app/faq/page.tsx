import BotanicalBorder from "@/components/layout/BorderDivider/BotanicalBorder";

function Page() {
	return (
		<main>
			<section className="flex justify-center bg-secondary-200 px-4 pb-10 pt-30 py-12 md:px-10 md:pt-32 lg:pb-14 xl:pb-20 xl:pt-40">
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
			<BotanicalBorder variant="muted" />
		</main>
	);
}

export default Page;
