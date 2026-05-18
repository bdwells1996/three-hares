"use client";

import { useActionState } from "react";
import Button from "@/components/ui/Button";
import SelectInput from "@/components/ui/SelectInput";
import TextInput from "@/components/ui/TextInput";
import { sendContactEmail, type ContactFormState } from "../actions";

const ARTISTS = ["Rosie", "Jamie", "Alex", "Other"];
const ENQUIRY_TYPES = ["New tattoo", "Touch-up", "Cover-up", "Flash", "Other"];

const initialState: ContactFormState = { status: "idle" };

export default function ContactForm() {
	const [state, action, pending] = useActionState(
		sendContactEmail,
		initialState,
	);

	if (state.status === "success") {
		return (
			<div className="flex flex-col items-center gap-4 py-12">
				<p className="font-title text-title-sm text-primary-950 text-center">
					Message sent!
				</p>
				<p className="text-body-md text-primary-500 text-center">
					We&apos;ll be in touch soon.
				</p>
			</div>
		);
	}

	const errors = state.status === "error" ? state.errors : {};

	return (
		<form action={action} className="flex flex-col gap-4 w-full">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<TextInput
					label="First name"
					name="firstName"
					placeholder="First name"
					error={errors.firstName}
				/>
				<TextInput
					label="Last name"
					name="lastName"
					placeholder="Last name"
					error={errors.lastName}
				/>
			</div>

			<TextInput
				label="Email"
				name="email"
				type="email"
				placeholder="your@email.com"
				error={errors.email}
			/>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<SelectInput
					label="I'm interested in work by (optional)"
					name="artist"
					placeholder="Select an artist"
					options={ARTISTS}
				/>
				<SelectInput
					label="Type of enquiry (optional)"
					name="enquiryType"
					placeholder="Select an enquiry type"
					options={ENQUIRY_TYPES}
				/>
			</div>

			<div className="flex flex-col gap-1 w-full">
				<label
					htmlFor="message"
					className="text-body-md text-primary-950 font-body"
				>
					Your message
				</label>
				<textarea
					id="message"
					name="message"
					placeholder="Type your message here"
					className="bg-white border border-primary-400 rounded-md px-3 py-2 h-20 text-body-md font-body text-primary-950 placeholder:text-primary-500 focus:outline-none focus:border-primary-600 resize-none"
				/>
				{errors.message && (
					<p className="text-red-600 text-body-sm">{errors.message[0]}</p>
				)}
			</div>

			{errors._form && (
				<p className="text-red-600 text-body-sm">{errors._form[0]}</p>
			)}

			<Button type="submit" className="self-start mt-1" disabled={pending}>
				{pending ? "Sending…" : "Submit"}
			</Button>
		</form>
	);
}
