"use client";

import { m } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
  label: string;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}

/**
 * Native <dialog> shared by the mobile menu, project details and the lightbox.
 * The browser provides the focus trap, Escape key and inert page behind it.
 * Render inside <AnimatePresence> for the exit fade.
 */
export function Dialog({ label, onClose, className, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement as HTMLElement | null;
    if (dialog && !dialog.open) dialog.showModal();
    return () => opener?.focus({ preventScroll: true });
  }, []);

  return (
    <m.dialog
      ref={ref}
      aria-label={label}
      className={cn("dialog-root", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      // Chrome may skip `cancel` and close directly, so state must follow the native close too.
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {children}
    </m.dialog>
  );
}
