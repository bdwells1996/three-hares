"use client";

import { useState } from "react";
import { z } from "zod";
import Button from "@/components/ui/Button";
import SelectInput from "@/components/ui/SelectInput";
import TextInput from "@/components/ui/TextInput";

const ARTISTS = ["Rosie", "Jamie", "Alex", "Other"];
const ENQUIRY_TYPES = ["New tattoo", "Touch-up", "Cover-up", "Flash", "Other"];

const contactSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Please enter a valid email address"),
	artist: z.string().optional(),
	enquiryType: z.string().optional(),
	message: z.string().min(1, "Message is required"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string[]>> & {
	_form?: string[];
};

const WORKER_BASE_URL = process.env.NEXT_PUBLIC_WORKER_URL || "";

export default function ContactForm() {
	const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
	const [errors, setErrors] = useState<FieldErrors>({});
	const [pending, setPending] = useState(false);

	if (status === "success") {
		return (
			<div className="flex flex-col items-center gap-4 py-8">
				<p className="font-title text-title-sm text-primary-950 text-center">
					Message sent!
				</p>
				<p className="text-body-lg text-primary-950 text-center xl:text-body-xl">
					We&apos;ll be in touch soon.
				</p>
			</div>
		);
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setPending(true);
		setErrors({});

		const formData = new FormData(e.currentTarget);
		const raw = {
			firstName: formData.get("firstName"),
			lastName: formData.get("lastName"),
			email: formData.get("email"),
			artist: formData.get("artist"),
			enquiryType: formData.get("enquiryType"),
			message: formData.get("message"),
		};

		const parsed = contactSchema.safeParse(raw);
		if (!parsed.success) {
			setErrors(parsed.error.flatten().fieldErrors);
			setPending(false);
			return;
		}

		try {
			const res = await fetch(`${WORKER_BASE_URL.replace(/\/+$/, "")}/contact`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(parsed.data),
			});

			const body = await res.json().catch(() => null);

			if (!res.ok || !body?.success) {
				setErrors(body?.errors || { _form: ["Failed to send message. Please try again."] });
				setStatus("error");
				return;
			}

			setStatus("success");
		} catch {
			setErrors({ _form: ["Failed to send message. Please try again."] });
			setStatus("error");
		} finally {
			setPending(false);
		}
	}

	const idleErrors = status === "error" ? errors : {};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<TextInput
					label="First name"
					name="firstName"
					placeholder="First name"
					error={idleErrors.firstName}
				/>
				<TextInput
					label="Last name"
					name="lastName"
					placeholder="Last name"
					error={idleErrors.lastName}
				/>
			</div>

			<TextInput
				label="Email"
				name="email"
				type="email"
				placeholder="your@email.com"
				error={idleErrors.email}
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
					className="bg-white border border-primary-400 rounded-md px-3 py-2 h-20 text-body-lg font-body text-primary-950 placeholder:text-primary-500 focus:outline-none focus:border-primary-600 resize-none lg:h-28"
				/>
				{idleErrors.message && (
					<p className="text-red-600 text-body-sm">{idleErrors.message[0]}</p>
				)}
			</div>

			{idleErrors._form && (
				<p className="text-red-600 text-body-sm">{idleErrors._form[0]}</p>
			)}

			<Button type="submit" className="self-start mt-1" disabled={pending}>
				{pending ? "Sending…" : "Submit"}
			</Button>
		</form>
	);
}
