"use client";

import dynamic from "next/dynamic";

/** Keeps the validation libraries out of the initial bundle. The form is below the fold. */
export const EnquiryFormLoader = dynamic(
  () => import("@/components/EnquiryForm").then((module) => module.EnquiryForm),
  {
    ssr: false,
    loading: () => <div aria-hidden="true" className="min-h-[38rem] bg-white" />,
  },
);
