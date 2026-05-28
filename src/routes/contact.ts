import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

const TO_EMAIL = "anshuanandani@gmail.com";
const FROM_EMAIL = "onboarding@resend.dev";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const Route = createFileRoute("/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const RESEND_API_KEY = process.env.RESEND_DIRECT_API_KEY;
        if (!RESEND_API_KEY) {
          return Response.json({ error: "Email service not configured" }, { status: 500 });
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = ContactSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "Invalid input", details: parsed.error.flatten() },
            { status: 400 },
          );
        }
        const { name, email, message } = parsed.data;

        const html = `
          <div style="font-family:Inter,Arial,sans-serif;color:#111;line-height:1.5">
            <h2 style="margin:0 0 16px">New portfolio contact</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space:pre-wrap;padding:12px;background:#f6f6f6;border-radius:8px">${escapeHtml(message)}</p>
          </div>
        `;

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: `Portfolio Contact <${FROM_EMAIL}>`,
            to: [TO_EMAIL],
            reply_to: email,
            subject: `New message from ${name}`,
            html,
          }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          console.error("Resend send failed", res.status, data);
          return Response.json(
            { error: (data as any)?.message || "Failed to send email" },
            { status: 502 },
          );
        }

        return Response.json({ success: true });
      },
    },
  },
});
