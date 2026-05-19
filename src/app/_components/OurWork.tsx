import InstagramGallery from "@/components/InstagramGallery/InstagramGallery";

export default function OurWork() {
	return (
		<>
			<section className="flex flex-col items-center bg-primary-300 py-7">
				<div className="max-w-[1240px] w-full py-[10px]">
					<h2 className="font-title text-title-md text-primary-950 text-center lg:text-title-lg">
						Take a look at some of our work
					</h2>
				</div>
			</section>
			<InstagramGallery cap={12} />
		</>
	);
}
