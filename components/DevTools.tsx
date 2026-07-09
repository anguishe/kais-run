"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  clearAdsDevEventLog,
  createGoogleAdsDebugLogger,
  getAdsDevEventLog,
  GOOGLE_ADS_DEV_LOG_EVENT,
  isGtagLoaded,
  simulateTestConversion,
  type GoogleAdsDevLogEntry,
  type SimulatedConversionKind,
} from "@/lib/googleAds.test";

const debug = createGoogleAdsDebugLogger("DevTools");

const ADS_ENV_KEYS = [
  "NEXT_PUBLIC_GOOGLE_ADS_ID",
  "NEXT_PUBLIC_FOUNDING_ATHLETE_LABEL",
  "NEXT_PUBLIC_INTRO_SESSION_LABEL",
  "NEXT_PUBLIC_MEMBERSHIP_LABEL",
  "NEXT_PUBLIC_LEAD_CAPTURE_LABEL",
] as const;

function formatEnvValue(key: string, value: string | undefined): string {
  if (!value) return "(empty)";
  if (key.endsWith("_LABEL")) {
    return value.length > 6 ? `${value.slice(0, 3)}…${value.slice(-3)}` : "•••";
  }
  if (key === "NEXT_PUBLIC_GOOGLE_ADS_ID") {
    return value.length > 8 ? `${value.slice(0, 6)}…` : value;
  }
  return value;
}

function formatLogTime(ts: number): string {
  try {
    return new Date(ts).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return String(ts);
  }
}

const TRIGGER_BUTTONS: { kind: SimulatedConversionKind; label: string }[] = [
  { kind: "founding_athlete", label: "Founding" },
  { kind: "intro_session_1dog", label: "Intro ×1" },
  { kind: "intro_session_2dogs", label: "Intro ×2" },
  { kind: "lead_capture", label: "Lead" },
  { kind: "membership_example", label: "Member" },
];

/**
 * Development-only panel for firing test conversions and inspecting Ads env + recent gtag events.
 * Rendered from the root layout when `NODE_ENV === 'development'`.
 */
export default function DevTools() {
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState<readonly GoogleAdsDevLogEntry[]>(() => getAdsDevEventLog());
  const [gtagOk, setGtagOk] = useState(false);

  const refreshLog = useCallback(() => {
    setLog(getAdsDevEventLog());
  }, []);

  useEffect(() => {
    const onLog = () => refreshLog();
    window.addEventListener(GOOGLE_ADS_DEV_LOG_EVENT, onLog);
    const syncGtag = () => {
      setGtagOk(isGtagLoaded());
    };
    const t0 = window.setTimeout(syncGtag, 0);
    const t = window.setInterval(syncGtag, 2000);
    return () => {
      window.removeEventListener(GOOGLE_ADS_DEV_LOG_EVENT, onLog);
      window.clearTimeout(t0);
      window.clearInterval(t);
    };
  }, [refreshLog]);

  const envRows = useMemo(() => {
    return ADS_ENV_KEYS.map((key) => ({
      key,
      display: formatEnvValue(key, process.env[key]),
      rawSet: Boolean(process.env[key]?.trim()),
    }));
  }, []);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] font-body text-xs text-brand-offwhite pointer-events-auto">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg border border-brand-teal/40 bg-brand-charcoal/95 px-3 py-2 shadow-lg backdrop-blur-sm hover:border-brand-teal/70 transition-colors"
          aria-expanded={false}
        >
          <span className="text-brand-gold tracking-[0.12em] uppercase text-[10px]">Kai&apos;s Run</span>
          <span className="block text-left font-medium text-brand-offwhite">Ads dev</span>
        </button>
      ) : (
        <div className="flex w-[min(100vw-2rem,20rem)] max-h-[min(70vh,28rem)] flex-col overflow-hidden rounded-xl border border-brand-teal/35 bg-brand-charcoal/95 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between gap-2 border-b border-brand-teal/25 px-3 py-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gold">Dev only</p>
              <p className="font-medium text-brand-offwhite">Google Ads</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-1 text-brand-offwhite/80 hover:bg-brand-teal/20 hover:text-brand-offwhite"
              aria-label="Close dev tools"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 border-b border-brand-teal/20 px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider text-brand-gray">gtag</p>
            <p className={gtagOk ? "text-brand-teal-light" : "text-brand-gold"}>
              {gtagOk ? "Loaded" : "Not detected (check ID + network)"}
            </p>
          </div>

          <div className="space-y-2 border-b border-brand-teal/20 px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider text-brand-gray">Test conversions</p>
            <div className="flex flex-wrap gap-1.5">
              {TRIGGER_BUTTONS.map(({ kind, label }) => (
                <button
                  key={kind}
                  type="button"
                  onClick={() => {
                    simulateTestConversion(kind);
                    debug.info("simulated", kind);
                    refreshLog();
                  }}
                  className="rounded-md border border-brand-teal/30 bg-brand-black/60 px-2 py-1 text-[11px] text-brand-offwhite hover:border-brand-teal hover:bg-brand-teal/15"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-28 overflow-y-auto border-b border-brand-teal/20 px-3 py-2">
            <p className="mb-1 text-[10px] uppercase tracking-wider text-brand-gray">NEXT_PUBLIC_* (masked)</p>
            <ul className="space-y-0.5 font-mono text-[10px] text-brand-offwhite/90">
              {envRows.map((row) => (
                <li key={row.key} className="flex justify-between gap-2">
                  <span className="truncate text-brand-gray" title={row.key}>
                    {row.key.replace("NEXT_PUBLIC_", "")}
                  </span>
                  <span className={row.rawSet ? "text-brand-teal-light/90" : "text-brand-gold/90"}>{row.display}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex min-h-0 flex-1 flex-col px-3 py-2">
            <div className="mb-1 flex items-center justify-between gap-2">
              <p className="text-[10px] uppercase tracking-wider text-brand-gray">Recent conversions</p>
              <button
                type="button"
                onClick={() => {
                  clearAdsDevEventLog();
                  refreshLog();
                }}
                className="text-[10px] text-brand-teal-light hover:underline"
              >
                Clear
              </button>
            </div>
            <ul className="max-h-32 space-y-1 overflow-y-auto font-mono text-[10px] leading-snug text-brand-offwhite/85">
              {log.length === 0 ? (
                <li className="text-brand-gray">No events yet - fire a test conversion or use the site.</li>
              ) : (
                log.map((entry, i) => (
                  <li key={`${entry.ts}-${i}`} className="border-l border-brand-teal/25 pl-2">
                    <span className="text-brand-gold/90">{formatLogTime(entry.ts)}</span>{" "}
                    <span className="text-brand-offwhite">{entry.event}</span>
                    <pre className="mt-0.5 whitespace-pre-wrap break-all text-brand-gray">
                      {JSON.stringify(entry.detail)}
                    </pre>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
