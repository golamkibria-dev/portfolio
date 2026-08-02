import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// ---------------------------------------------------------------------------
// POST /api/contact
// Validates the incoming contact form payload and sends a notification email
// via Resend. Requires RESEND_API_KEY and CONTACT_TO_EMAIL in the environment.
// Falls back to a clear error if the API key hasn't been configured yet.
// ---------------------------------------------------------------------------

const ContactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2).max(150),
  message: z.string().min(10, "Message is too short").max(5000),
  // Honeypot field — bots tend to fill every input, humans never see it.
  company: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // Honeypot triggered — silently pretend success to not tip off bots.
  if (parsed.data.company) {
    return NextResponse.json({ success: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    console.warn("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL not configured.");
    return NextResponse.json(
      { error: "Email service is not configured on the server yet." },
      { status: 503 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>New message from your portfolio</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
