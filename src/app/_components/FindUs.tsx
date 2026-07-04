"use client";

import Button from "@/components/ui/Button";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { type CSSProperties } from "react";

function fadeIn(visible: boolean, delayMs: number): CSSProperties {
	return {
		opacity: visible ? 1 : 0,
		transform: visible ? "translateY(0)" : "translateY(16px)",
		transition: visible
			? `opacity 0.6s ease ${delayMs}ms, transform 0.6s ease ${delayMs}ms`
			: "none",
	};
}

function FindUs() {
	const { ref, inView } = useInViewAnimation<HTMLElement>();

	return (
		<section
			ref={ref}
			className="pt-7 pb-5 flex flex-col items-center bg-primary-300 px-4 -mt-[1px] lg:px-8 xl:pt-12 xl:pb-19"
		>
			<div className="w-full max-w-[1240px] lg:flex lg:flex-row lg:flex-wrap lg:gap-x-[36px] lg:gap-y-[28px] xl:gap-x-[64px]">
				<h2
					style={fadeIn(inView, 0)}
					className="text-title-md font-title text-center text-primary-950 w-full lg:text-title-lg"
				>
					Where to find us!
				</h2>

				{/* Left: map + address */}
				<div
					style={fadeIn(inView, 0)}
					className="flex flex-col gap-6 md:px-24 lg:px-0 lg:flex-1 lg:gap-8"
				>
					<div className="w-full mt-8 rounded-xl image-offset-border lg:before:hidden xl:before:block lg:h-full lg:max-h-117.5">
						<div className="rounded-xl overflow-hidden aspect-square lg:h-full">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.501363167226!2d-0.13291822302306752!3d50.82187666055037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487585814d03b6ff%3A0x942a11a35e01a2d4!2sThree%20Hares%20Tattoo!5e0!3m2!1sen!2suk!4v1778607986610!5m2!1sen!2suk"
								width="100%"
								height="100%"
								style={{ border: 0 }}
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								title="Three Hares Tattoo location"
							></iframe>
						</div>
					</div>
					<span className="text-body-lg font-semibold text-primary-950">
						<p>Unit 2, 129 - 130 The Design Quarter</p>
						<p>Edward St, Kemptown</p>
						<p>Brighton</p>
						<p className="text-body-lg text-primary-950">BN2 0JL</p>
					</span>
				</div>

				{/* Right: text content */}
				<div className="py-[14px] my-4 flex flex-col text-primary-950 lg:max-w-[500px] xl:max-w-[730px]">
					<h3
						style={fadeIn(inView, 300)}
						className="text-[24px] font-title text-center text-left leading-[28px] lg:text-title-sm xl:text-title-md"
					>
						We’re located in Kemptown, Brighton.
					</h3>
					<div className="flex flex-col gap-[18px] mt-[10px]">
						<p
							style={fadeIn(inView, 450)}
							className="text-body-lg xl:text-body-xl"
						>
							You can find us up Edward Street, behind a grey gate, named The
							Design Quarters. Our buzzer is clearly labelled and on the left
							hand side of the gate. We will buzz you in and greet you!
						</p>
						<div className="flex flex-col gap-[24px] lg:gap-5">
							<div
								style={fadeIn(inView, 600)}
								className="text-body-lg font-body text-primary-950 flex flex-col gap-[10px] xl:text-body-xl"
							>
								<h4 className="font-semibold text-body-xl">Bus</h4>
								<p>
									We’re along the major routes from Brighton & Hove to Kemptown,
									including buses 7, 1, and 1X with bus stops along Edward
									Street and St James Street - a 5 minute walk away.
								</p>
							</div>
							<div
								style={fadeIn(inView, 750)}
								className="text-body-lg font-body text-primary-950 flex flex-col gap-[10px] xl:text-body-xl"
							>
								<h4 className="font-semibold text-body-xl">Train</h4>
								<p>
									We are a 20 minute walk away from Brighton train station. You
									can hop on the number 7 bus from outside the station and
									depart at ‘Devonshire Place’ next to the Co-Op on St James
									Street. Take a left up Devonshire Place and a right onto
									Edward Street.
								</p>
							</div>
							<div
								style={fadeIn(inView, 900)}
								className="text-body-lg font-body text-primary-950 flex flex-col gap-[10px] xl:text-body-xl"
							>
								<h4 className="font-semibold text-body-xl">Walk</h4>
								<p>
									We are just up the road from the Old Steine, with our nearest
									landmarks being Brighton Palace Pier and the Pavilion, both a
									10 minute walk away. Once you are walking up Edward Street,
									you will notice the Brighton Youth Centre (brightly coloured
									building!) up the hill on the left. We are pretty much
									opposite. Going up the hill, we are on the right hand side of
									the road.
								</p>
							</div>
							<div
								style={fadeIn(inView, 1050)}
								className="text-body-lg font-body text-primary-950 flex flex-col gap-[10px] xl:text-body-xl"
							>
								<h4 className="font-semibold text-body-xl">Car</h4>
								<p>
									We are in a residential area with mostly permitted parking.
									However there are many roads nearby such as Blaker Street,
									White Street and Marine View, where you can park for up to 4
									hours and pay via PaybyPhone. For day sessions, we advise
									parking along Freshfield Road (a 5-20 minute walk away,
									depending where on the road you park) for up to 11 hours for
									under £10 on PaybyPhone. There are many car parks in Brighton
									city centre, such as The Lanes Car Park, London Road Car Park
									and Churchill Square Car Park, these are priced at around
									£25-£40 for 8 hours. We recommend checking parking options
									before your appointment on{" "}
									<a
										href="https://www.parkopedia.com"
										target="_blank"
										rel="noopener noreferrer"
										className="underline"
									>
										www.parkopedia.com
									</a>
								</p>
							</div>
							<div
								style={fadeIn(inView, 1050)}
								className="items-center gap-6 w-full hidden lg:flex"
							>
								<p className="text-body-xl font-body text-primary-950 font-semibold">
									Still not sure how to get to us?
								</p>
								<a
									href="https://maps.app.goo.gl/iZZhmZQwvaPh6kKw7"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Button tabIndex={-1}>Get directions</Button>
								</a>
							</div>
						</div>
					</div>
				</div>

				<div
					style={fadeIn(inView, 1050)}
					className="flex flex-col items-center gap-6 md:flex-row lg:hidden"
				>
					<p className="text-body-xl font-body text-primary-950 font-semibold md:text-body-lg">
						Still not sure how to get to us?
					</p>
					<a
						href="https://maps.app.goo.gl/iZZhmZQwvaPh6kKw7"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button tabIndex={-1}>Get directions</Button>
					</a>
				</div>
			</div>
		</section>
	);
}

export default FindUs;
