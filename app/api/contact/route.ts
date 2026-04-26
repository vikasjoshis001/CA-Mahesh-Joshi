import { NextResponse } from "next/server";
import { Resend } from "resend";

// Resend is lazily initialised inside the POST handler so that missing the
// env var at build time does not crash module evaluation (and therefore the
// production build).  The env-var check inside the handler gives a clean 500.

// Email template component
function ContactEmailTemplate({
  name,
  email,
  phone,
  service,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1e3a8a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; color: #1e3a8a; margin-bottom: 5px; display: block; }
    .value { background: white; padding: 12px; border-radius: 4px; border-left: 3px solid #f97316; }
    .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">New Contact Form Submission</h1>
      <p style="margin: 10px 0 0 0;">Mahesh Joshi & Associates</p>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span>
        <div class="value">${name}</div>
      </div>

      <div class="field">
        <span class="label">Email:</span>
        <div class="value"><a href="mailto:${email}" style="color: #1e3a8a;">${email}</a></div>
      </div>

      <div class="field">
        <span class="label">Phone:</span>
        <div class="value"><a href="tel:${phone}" style="color: #1e3a8a;">${phone}</a></div>
      </div>

      ${service ? `
      <div class="field">
        <span class="label">Service Required:</span>
        <div class="value">${service}</div>
      </div>
      ` : ''}

      <div class="field">
        <span class="label">Message:</span>
        <div class="value">${message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      <p>This email was sent from your website contact form.</p>
      <p>Reply directly to this email to contact the sender.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Send email using Resend (lazily initialised after env-var check)
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "Website Contact Form <onboarding@resend.dev>", // Resend's test email
      to: ["camaheshjoshi25@gmail.com"], // Your email
      replyTo: email, // Sender's email for easy reply
      subject: `New Contact Form Submission from ${name}`,
      html: ContactEmailTemplate({ name, email, phone, service, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
        id: data?.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get your Resend API key:
//     1. Sign up at https://resend.com/signup (free tier: 100 emails/day)
//     2. Create an API key
// 3. Add it to .env.local
// 4. Restart your dev server
