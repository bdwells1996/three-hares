import { z } from 'zod';
import { buildContactEmailHtml } from './emailTemplate';

export interface ContactEnv {
  RESEND_API_KEY: string;
  CONTACT_FROM_EMAIL: string;
  CONTACT_TO_EMAIL: string;
}

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  artist: z.string().optional(),
  enquiryType: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

export type ContactResult =
  | { status: 200; body: { success: true } }
  | { status: 400; body: { success: false; errors: Record<string, string[]> } }
  | { status: 500; body: { success: false; message: string } };

export async function handleContact(request: Request, env: ContactEnv): Promise<ContactResult> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return { status: 400, body: { success: false, errors: { _form: ['Invalid request body'] } } };
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: 400,
      body: { success: false, errors: parsed.error.flatten().fieldErrors as Record<string, string[]> },
    };
  }

  const { firstName, lastName, artist, email, enquiryType, message } = parsed.data;

  const plainLines = [
    `From: ${firstName} ${lastName}`,
    `Email: ${email}`,
    artist ? `Interested in work by: ${artist}` : null,
    enquiryType ? `Type of enquiry: ${enquiryType}` : null,
    '',
    message,
  ].filter((l): l is string => l !== null);

  const html = buildContactEmailHtml({ firstName, lastName, email, artist, enquiryType, message });

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `New enquiry from ${firstName} ${lastName}`,
      text: plainLines.join('\n'),
      html,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    console.error('[Resend] send failed', res.status, errBody);
    return {
      status: 500,
      body: { success: false, message: 'Failed to send message. Please try again.' },
    };
  }

  return { status: 200, body: { success: true } };
}
