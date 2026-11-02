import { z } from "zod";

/** Shared by the contact form and the API route, so both enforce the same rules. */
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Please keep your name under 80 characters."),
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/[\s()-]/g, ""))
    .pipe(
      z
        .string()
        .regex(/^(\+?91|0)?[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number."),
    ),
  email: z.email("Please enter a valid email address.").max(120),
  project: z.string().trim().min(1, "Please choose an option.").max(120),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(1000, "Please keep your message under 1000 characters."),
});

export type EnquiryFormValues = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

export interface EnquiryResponse {
  /** True only when the enquiry reached the configured destination. */
  delivered: boolean;
  demo: boolean;
  message: string;
  errors?: Partial<Record<keyof Enquiry, string[]>>;
}
