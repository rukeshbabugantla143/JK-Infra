"use client";

import { createContext, use, useMemo, useState } from "react";

interface EnquiryContextValue {
  project: string;
  setProject: (project: string) => void;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

/** Shares the visitor's chosen project between the project cards, form and WhatsApp button. */
export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState("");
  const value = useMemo(() => ({ project, setProject }), [project]);
  return <EnquiryContext value={value}>{children}</EnquiryContext>;
}

export function useEnquiry() {
  const context = use(EnquiryContext);
  if (!context) throw new Error("useEnquiry must be used inside EnquiryProvider");
  return context;
}
