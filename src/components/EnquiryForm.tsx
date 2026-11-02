"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, Info, TriangleAlert } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { useEnquiry } from "@/components/EnquiryProvider";
import { contactSection, projects } from "@/lib/data";
import {
  enquirySchema,
  type Enquiry,
  type EnquiryFormValues,
  type EnquiryResponse,
} from "@/lib/enquiry";

type Result = { kind: "delivered" | "demo" | "error"; message: string };

const resultStyles: Record<Result["kind"], { className: string; icon: typeof Info }> = {
  delivered: { className: "border-emerald-700/40 bg-emerald-50 text-emerald-900", icon: CircleCheck },
  demo: { className: "border-gold bg-gold/12 text-ink", icon: Info },
  error: { className: "border-red-700/40 bg-red-50 text-red-900", icon: TriangleAlert },
};

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: FieldError;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="label block text-navy-950">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-800">
          {error.message}
        </p>
      )}
    </div>
  );
}

export function EnquiryForm({ enquiriesLive }: { enquiriesLive: boolean }) {
  const formId = useId();
  const { project, setProject } = useEnquiry();
  const [result, setResult] = useState<Result | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues, unknown, Enquiry>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: { name: "", phone: "", email: "", project: "", message: "" },
  });

  useEffect(() => {
    if (project) setValue("project", project, { shouldValidate: true });
  }, [project, setValue]);

  async function onSubmit(values: Enquiry) {
    setResult(null);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = (await response.json()) as EnquiryResponse;

      for (const [name, messages] of Object.entries(body.errors ?? {})) {
        if (messages?.[0]) setError(name as keyof Enquiry, { message: messages[0] });
      }
      if (body.delivered) {
        reset();
        setProject("");
        setResult({ kind: "delivered", message: body.message });
      } else {
        setResult({ kind: body.demo && response.ok ? "demo" : "error", message: body.message });
      }
    } catch {
      setResult({ kind: "error", message: "We could not reach the server. Please try again." });
    }
  }

  const ids = {
    name: `${formId}-name`,
    phone: `${formId}-phone`,
    email: `${formId}-email`,
    project: `${formId}-project`,
    message: `${formId}-message`,
  };
  const a11y = (name: keyof Enquiry) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${ids[name]}-error` : undefined,
  });
  const ResultIcon = result && resultStyles[result.kind].icon;

  return (
    <form
      noValidate
      aria-label="Enquiry form"
      onSubmit={handleSubmit(onSubmit)}
      className="border-t-2 border-gold bg-white p-6 shadow-[0_24px_60px_-32px_rgb(7_22_41/0.35)] sm:p-10"
    >
      {!enquiriesLive && (
        <p className="mb-8 flex gap-3 border border-gold bg-gold/12 p-4 text-sm leading-relaxed text-ink">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-deep" />
          <span>
            <strong className="font-semibold">Demo form.</strong> Enquiries are not being delivered
            yet, and nothing you enter here is stored.
          </span>
        </p>
      )}

      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Name" id={ids.name} error={errors.name}>
          <input
            id={ids.name}
            type="text"
            autoComplete="name"
            className="field"
            {...a11y("name")}
            {...register("name")}
          />
        </Field>
        <Field label="Phone Number" id={ids.phone} error={errors.phone}>
          <input
            id={ids.phone}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="field"
            {...a11y("phone")}
            {...register("phone")}
          />
        </Field>
        <Field label="Email" id={ids.email} error={errors.email}>
          <input
            id={ids.email}
            type="email"
            autoComplete="email"
            className="field"
            {...a11y("email")}
            {...register("email")}
          />
        </Field>
        <Field label="Interested Project" id={ids.project} error={errors.project}>
          <select
            id={ids.project}
            className="field"
            {...a11y("project")}
            {...register("project", { onChange: (event) => setProject(event.target.value) })}
          >
            <option value="">Select an option</option>
            <option value={contactSection.generalEnquiry}>{contactSection.generalEnquiry}</option>
            {projects.map(({ id, name, isSample }) => (
              <option key={id} value={name}>
                {name}
                {isSample ? " (demo)" : ""}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Message" id={ids.message} error={errors.message}>
            <textarea
              id={ids.message}
              rows={4}
              className="field resize-y"
              {...a11y("message")}
              {...register("message")}
            />
          </Field>
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="btn btn-navy mt-9 w-full sm:w-auto">
        {isSubmitting ? "Submitting" : "Submit Enquiry"}
      </button>

      <div aria-live="polite">
        {result && ResultIcon && (
          <p
            className={`mt-6 flex gap-3 border p-4 text-sm leading-relaxed ${resultStyles[result.kind].className}`}
          >
            <ResultIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {result.message}
          </p>
        )}
      </div>
    </form>
  );
}
