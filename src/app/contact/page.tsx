import ContactForm from "./components/ContactForm";
import BorderDivider from "@/components/layout/BorderDivider/BorderDivider";

export const metadata = {
	title: "Get in touch | Three Hares",
};

export default function ContactPage() {
	return (
		<main>
			<section className="flex justify-center bg-secondary-200 px-4 pb-12 pt-30 py-12 md:px-10 md:pt-32 lg:pb-16 xl:pb-20 xl:pt-40">
				<div className="flex flex-col items-center gap-4 max-w-[1240px]">
					<h1 className="text-title-md font-title text-center text-primary-800 lg:text-title-lg xl:text-title-xl">
						Want to get tattooed by us?
					</h1>
					<p className="text-body-lg text-primary-700 max-w-[800px] text-center xl:text-body-xl">
						Lorem ipsum dolor sit amet consectetur. Posuere amet tortor
						ultricies vestibulum in vitae at. Tellus egestas morbi tempor diam
						sed. Suspendisse egestas pharetra habitant sit purus blandit metus
						faucibus sagittis. Consectetur auctor elit sit phasellus a.
					</p>
				</div>
			</section>
			<BorderDivider variant="botanical-muted" />
			<section className="flex justify-center bg-secondary-200 px-4 pb-14 pt-6 md:px-8 md:px-10 md:pt-10 xl:pt-12">
				<div className="flex flex-col items-center gap-7 w-full max-w-[680px]">
					<h1 className="font-title text-title-md text-primary-950 text-center lg:text-title-lg">
						Get in touch
					</h1>
					<ContactForm />
				</div>
			</section>
			<BorderDivider variant="botanical-muted" flipped={true} />
		</main>
	);
}
