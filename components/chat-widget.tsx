"use client";

import { useEffect, useState } from "react";
import { type Locale } from "@/i18n/config";

const PROJECT_ID = process.env.NEXT_PUBLIC_VOICEFLOW_PROJECT_ID;

export function ChatWidget({ lang }: { lang: Locale }) {
  const [open, setOpen] = useState(false);
  const isAr = lang === "ar";

  useEffect(() => {
    if (!PROJECT_ID) return; // stay in placeholder mode until an ID exists

    const v = document.createElement("script");
    const s = document.getElementsByTagName("script")[0];
    v.onload = () => {
      (window as any).voiceflow?.chat?.load({
        verify: { projectID: PROJECT_ID },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
        // hand the active language to your Voiceflow agent as a launch variable
        launch: { event: { type: "launch", payload: { lang } } },
      });
    };
    v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    v.type = "text/javascript";
    s?.parentNode?.insertBefore(v, s);

    return () => {
      v.remove();
      (window as any).voiceflow?.chat?.destroy?.();
    };
  }, [lang]);

  // Once configured, Voiceflow renders its own launcher — we render nothing.
  if (PROJECT_ID) return null;

  // ---------- Placeholder launcher ----------
  return (
    <div className="fixed bottom-6 end-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="max-w-[260px] rounded-2xl border border-border bg-surface p-4 text-start shadow-lg">
          <p className="font-display text-lg text-ink">
            {isAr ? "تحدّث معنا قريبًا" : "Chat with us soon"}
          </p>
          <p className="mt-1 text-sm text-muted">
            {isAr
              ? "مساعد المحادثة قيد الإعداد."
              : "Our chat assistant is being set up."}
          </p>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={isAr ? "افتح المحادثة" : "Open chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brass text-ink shadow-lg transition hover:brightness-95"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>
    </div>
  );
}