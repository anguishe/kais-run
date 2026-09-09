'use client';

import { useEffect, useState } from 'react';

const PROFILE = 'https://yoursuperdad.org/travis-abadie-U8wI';
const KEY = 'sd2026';
const DAY = 24 * 60 * 60 * 1000;

// ponytail: localStorage only. No cookies, no backend, nothing leaves the browser —
// which is also why a cleared browser just shows the first-time steps again, and that
// is a fine failure mode. Never try to vote for anyone: competitors manufacturing
// their own votes is instant disqualification.
type Saved = { last: number; streak: number };

function read(): Saved | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Saved;
    return typeof v?.last === 'number' ? v : null;
  } catch {
    return null;
  }
}

function waitLabel(ms: number) {
  const h = Math.floor(ms / (60 * 60 * 1000));
  if (h >= 1) return `${h} more hour${h === 1 ? '' : 's'}`;
  const m = Math.max(1, Math.round(ms / (60 * 1000)));
  return `${m} more minute${m === 1 ? '' : 's'}`;
}

export default function VoteCta() {
  // starts null so the server render and the first client render match: everyone gets
  // the full instructions until we have actually read storage.
  const [saved, setSaved] = useState<Saved | null>(null);
  const [ready, setReady] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    setSaved(read());
    setReady(true);
    const t = setInterval(() => setNow(Date.now()), 60 * 1000);
    return () => clearInterval(t);
  }, []);

  function record() {
    const prev = read();
    const t = Date.now();
    // a vote 20-48h after the last one continues the streak; a longer gap starts over.
    const gap = prev ? t - prev.last : Infinity;
    const streak = prev && gap < 2 * DAY ? prev.streak + 1 : 1;
    try {
      localStorage.setItem(KEY, JSON.stringify({ last: t, streak }));
    } catch {
      /* private mode — the link still works, which is the part that matters */
    }
    setSaved({ last: t, streak });
  }

  const returning = ready && saved !== null;
  const elapsed = saved ? now - saved.last : 0;
  const dueIn = saved ? DAY - elapsed : 0;
  const canVote = !saved || dueIn <= 0;

  return (
    <div className="space-y-6">
      <a
        href={PROFILE}
        target="_blank"
        rel="noopener noreferrer"
        onClick={record}
        className="block w-full rounded-lg bg-brand-gold px-8 py-5 text-center font-display text-3xl tracking-wide text-brand-black transition hover:opacity-90"
      >
        {canVote ? 'Vote for Travis' : 'Vote again'}
      </a>

      {returning && (
        <p className="text-center text-brand-offwhite">
          {canVote ? (
            <>Your free vote is ready.</>
          ) : (
            <>
              You voted today. Next one in <strong>{waitLabel(dueIn)}</strong>.
            </>
          )}
          {saved!.streak > 1 && (
            <>
              {' '}
              <span className="text-brand-gold">{saved!.streak} days running.</span>
            </>
          )}
        </p>
      )}

      {!returning && (
        <ol className="space-y-4 text-brand-offwhite">
          <li>
            <strong className="text-brand-gold">1.</strong> Tap the button, then tap{' '}
            <strong>VOTE</strong> on the profile that opens.
          </li>
          <li>
            <strong className="text-brand-gold">2.</strong> Confirm the email they send you.
            One time only — and this is where most votes get lost. Check spam if it does not
            land in a minute.
          </li>
          <li>
            <strong className="text-brand-gold">3.</strong>{' '}
            Come back tomorrow. One free vote per person every 24 hours, and the round totals
            reset, so today&apos;s vote does not carry over.
          </li>
        </ol>
      )}
    </div>
  );
}
