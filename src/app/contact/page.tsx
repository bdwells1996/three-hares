import ContactSection from "./components/ContactSection";
import BorderDivider from "@/components/layout/BorderDivider/BorderDivider";
import PageHeader from "@/components/layout/PageHeader/PageHeader";

export const metadata = {
	title: "Get in touch | Three Hares",
};

export default function ContactPage() {
	return (
		<main>
			<section className="flex justify-center bg-secondary-200 px-4 pb-12 pt-30 py-12 md:px-10 md:pt-32 lg:pb-16 xl:pb-20 xl:pt-40">
				<PageHeader
					title="Want to get tattooed by us?"
					subtitle="Lorem ipsum dolor sit amet consectetur. Posuere amet tortor ultricies vestibulum in vitae at. Tellus egestas morbi tempor diam sed. Suspendisse egestas pharetra habitant sit purus blandit metus faucibus sagittis. Consectetur auctor elit sit phasellus a."
					titleClassName="text-primary-800"
					subtitleClassName="text-primary-700"
				/>
			</section>
			<BorderDivider variant="botanical-muted" />
			<section className="flex justify-center bg-secondary-200 px-4 pb-10 pt-6 md:px-8 md:p-10 md:pb-12">
				<ContactSection />
			</section>
			<BorderDivider variant="botanical-muted" flipped={true} />
		</main>
	);
}
