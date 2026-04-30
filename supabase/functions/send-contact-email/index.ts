import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";
import { z } from "https://esm.sh/zod@3.23.8";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

// TODO: Replace with production recipients (e.g. estimating@myersunderground.com) before go-live.
const TEST_RECIPIENTS = ["dustan@hasten.tv", "accounts@mrfxr.com"];
const FROM_ADDRESS = "Myers Website <onboarding@resend.dev>";

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().max(100).optional().default(""),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  projectType: z.string().min(1).max(100),
  message: z.string().trim().min(10).max(2000),
});

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
   .replace(/"/g, "&quot;").replace(/'/g, "&#039;");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const d = parsed.data;

    const html = `
      <h2>New Project Inquiry — Myers Underground Utilities</h2>
      <p><strong>Name:</strong> ${escapeHtml(d.name)}</p>
      ${d.company ? `<p><strong>Company:</strong> ${escapeHtml(d.company)}</p>` : ""}
      <p><strong>Email:</strong> ${escapeHtml(d.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(d.phone)}</p>
      <p><strong>Project Type:</strong> ${escapeHtml(d.projectType)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(d.message)}</p>
      <hr/>
      <p style="color:#888;font-size:12px">Sent from the Myers Underground Utilities website (test mode → ${TEST_RECIPIENT}).</p>
    `;

    const resp = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [TEST_RECIPIENT],
        reply_to: d.email,
        subject: `Project Inquiry — ${d.projectType} (${d.name})`,
        html,
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error("Resend error", resp.status, data);
      throw new Error(`Resend send failed [${resp.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true, id: data?.id ?? null }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("send-contact-email error:", msg);
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
