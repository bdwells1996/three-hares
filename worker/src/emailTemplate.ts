// primary-200: #e3e8e4  primary-300: #c0cac2  primary-500: #697b6d
// primary-950: #080d09  secondary-500: #cc8767  secondary-700: #995a3c

export interface ContactEmailData {
	firstName: string;
	lastName: string;
	email: string;
	artist?: string;
	enquiryType?: string;
	message: string;
}

export function buildContactEmailHtml(data: ContactEmailData): string {
	const { firstName, lastName, email, artist, enquiryType, message } = data;

	const safeMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

	const optionalRows = [
		artist
			? `<tr>
          <td style="padding:5px 0;color:#697b6d;font-size:14px;font-family:sans-serif;width:140px;">Interested in work by</td>
          <td style="padding:5px 0;color:#080d09;font-size:14px;font-family:sans-serif;">${artist}</td>
        </tr>`
			: "",
		enquiryType
			? `<tr>
          <td style="padding:5px 0;color:#697b6d;font-size:14px;font-family:sans-serif;">Enquiry type</td>
          <td style="padding:5px 0;color:#080d09;font-size:14px;font-family:sans-serif;">${enquiryType}</td>
        </tr>`
			: "",
	].join("");

	return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F3DFD5;overflow:hidden;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F3DFD5;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#f4f5f5;border-radius:8px;overflow:hidden;border:1px solid #c0cac2;">

        <!-- Header -->
        <tr>
          <td style="background:#F3DFD5;padding:28px 32px;border-bottom:1px solid #c0cac2;">
            <h1 style="margin:6px 0 0;font-family:Georgia,serif;font-size:22px;color:#080d09;font-weight:normal;">New Enquiry</h1>
          </td>
        </tr>

        <!-- Details -->
        <tr>
          <td style="padding:28px 14px;">
            <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:5px 0;color:#697b6d;font-size:14px;font-family:sans-serif;width:140px;">Name</td>
                <td style="padding:5px 0;color:#080d09;font-size:14px;font-family:sans-serif;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding:5px 0;color:#697b6d;font-size:13px;font-family:sans-serif;">Email</td>
                <td style="padding:5px 0;font-size:13px;font-family:sans-serif;">
                  <a href="mailto:${email}" style="color:#995a3c;text-decoration:none;">${email}</a>
                </td>
              </tr>
              ${optionalRows}
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:24px 14px;">
            <p style="margin:0 0 8px;font-family:sans-serif;font-size:14px;letter-spacing:0.1em;color:#697b6d;">Message</p>
            <div style="background:#F3DFD5;border-radius:6px;padding:16px 20px;">
              <p style="margin:0;font-family:sans-serif;font-size:14px;line-height:1.6;color:#080d09;white-space:pre-wrap;">${safeMessage}</p>
            </div>
          </td>
        </tr>

        <!-- Reply CTA -->
        <tr>
          <td style="padding:24px 14px;">
            <a href="mailto:${email}" style="display:inline-block;background:#697B6D;color:#f9fafa;font-family:Georgia,serif;font-size:13px;font-weight:600;text-decoration:none;padding:10px 22px;border-radius:4px;">Reply to ${firstName}</a>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
