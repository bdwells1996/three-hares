"use server";

import nodemailer from "nodemailer";
import { z } from "zod";
import { buildContactEmailHtml } from "./emailTemplate";

const contactSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Please enter a valid email address"),
	artist: z.string().optional(),
	enquiryType: z.string().optional(),
	message: z.string().min(1, "Message is required"),
});

export type ContactFormState =
	| { status: "idle" }
	| { status: "success" }
	| {
			status: "error";
			errors: Partial<Record<keyof z.infer<typeof contactSchema>, string[]>> & {
				_form?: string[];
			};
	  };

export async function sendContactEmail(
	_prev: ContactFormState,
	formData: FormData,
): Promise<ContactFormState> {
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
		return { status: "error", errors: parsed.error.flatten().fieldErrors };
	}

	const { firstName, lastName, email, artist, enquiryType, message } =
		parsed.data;

	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT ?? 587),
		secure: process.env.SMTP_SECURE === "true",
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	});

	const plainLines = [
		`From: ${firstName} ${lastName}`,
		`Email: ${email}`,
		artist ? `Interested in work by: ${artist}` : null,
		enquiryType ? `Type of enquiry: ${enquiryType}` : null,
		"",
		message,
	].filter((l) => l !== null);

	const html = buildContactEmailHtml({
		firstName,
		lastName,
		email,
		artist,
		enquiryType,
		message,
	});

	try {
		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to: "bdwells1996@gmail.com",
			replyTo: email,
			subject: `New enquiry from ${firstName} ${lastName}`,
			text: plainLines.join("\n"),
			html,
		});
	} catch (err) {
		console.error("[sendContactEmail]", err);
		return {
			status: "error",
			errors: { _form: ["Failed to send message. Please try again."] },
		};
	}

	return { status: "success" };
}
