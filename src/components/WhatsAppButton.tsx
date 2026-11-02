"use client";

import { MessageCircle } from "lucide-react";
import { useEnquiry } from "@/components/EnquiryProvider";
import { contactSection } from "@/lib/data";
import { whatsappUrl } from "@/lib/utils";

/** The prepared message follows whichever project the visitor has chosen. */
export function WhatsAppButton({ className }: { className?: string }) {
  const { project } = useEnquiry();
  const subject = project === contactSection.generalEnquiry ? undefined : project || undefined;

  return (
    <a href={whatsappUrl(subject)} target="_blank" rel="noopener noreferrer" className={className}>
      <MessageCircle aria-hidden="true" className="size-4" />
      WhatsApp Enquiry
    </a>
  );
}
