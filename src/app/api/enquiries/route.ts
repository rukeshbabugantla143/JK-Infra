import { NextResponse } from "next/server";
import { z } from "zod";
import { enquirySchema, type EnquiryResponse } from "@/lib/enquiry";

const reply = (body: EnquiryResponse, status: number) => NextResponse.json(body, { status });

export async function POST(request: Request) {
  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
  const demo = !webhookUrl;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return reply({ delivered: false, demo, message: "Invalid request." }, 400);
  }

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    return reply(
      {
        delivered: false,
        demo,
        message: "Please check the highlighted fields.",
        errors: z.flattenError(parsed.error).fieldErrors,
      },
      422,
    );
  }

  // No destination yet: validate only. Never report this as a delivered enquiry.
  if (!webhookUrl) {
    return reply(
      {
        delivered: false,
        demo: true,
        message: "Demo mode: your details passed validation, but no enquiry was sent or stored.",
      },
      200,
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parsed.data, receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Enquiry destination responded with ${response.status}`);
  } catch (error) {
    console.error("Enquiry delivery failed", error);
    return reply(
      {
        delivered: false,
        demo: false,
        message: "We could not send your enquiry just now. Please try again shortly.",
      },
      502,
    );
  }

  return reply(
    { delivered: true, demo: false, message: "Thank you. We have received your enquiry." },
    200,
  );
}
