"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { I18nProvider } from "@/lib/i18n";
import { ResumeModalProvider } from "./ResumeModal";

export function Providers({ children }: { children: ReactNode }) {
  return (
    // "user": respeita prefers-reduced-motion nas animações do Framer Motion
    <MotionConfig reducedMotion="user">
      <I18nProvider>
        <ResumeModalProvider>{children}</ResumeModalProvider>
      </I18nProvider>
    </MotionConfig>
  );
}
