'use client';

import { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { Logo } from './logo';

const STORAGE_KEY = 'veliqu-age-confirmed';

export function AgeGate() {
  const [status, setStatus] = useState<'checking' | 'asking' | 'confirmed' | 'declined'>('checking');

  useEffect(() => {
    const confirmed = window.localStorage.getItem(STORAGE_KEY) === 'true';
    setStatus(confirmed ? 'confirmed' : 'asking');
  }, []);

  useEffect(() => {
    if (status !== 'asking' && status !== 'declined') return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [status]);

  if (status === 'checking' || status === 'confirmed') return null;

  function confirm() {
    window.localStorage.setItem(STORAGE_KEY, 'true');
    setStatus('confirmed');
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/85 px-5 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-title"
        className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500 motion-reduce:animate-none rounded-[28px] bg-paper-50 p-8 text-center shadow-2xl sm:p-10"
      >
        <div className="flex justify-center">
          <Logo />
        </div>

        {status === 'asking' ? (
          <>
            <h2 id="age-gate-title" className="mt-8 font-display text-3xl tracking-tight text-ink-950">
              Are you 18 or older?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">
              Veliqu is an exclusive platform for adults. You must be at least 18 years old to enter.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                autoFocus
                onClick={confirm}
                className="flex-1 rounded-full bg-ink-950 px-6 py-3.5 text-base font-medium text-paper-50 transition duration-200 hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
              >
                Yes, I am 18 or older
              </button>
              <button
                type="button"
                onClick={() => setStatus('declined')}
                className="flex-1 rounded-full border border-ink-900 px-6 py-3.5 text-base font-medium text-ink-950 transition duration-200 hover:bg-ink-950 hover:text-paper-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
              >
                No
              </button>
            </div>
          </>
        ) : (
          <>
            <span className="mx-auto mt-8 flex h-12 w-12 items-center justify-center rounded-full bg-ember-100 text-ember-700">
              <ShieldAlert className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 id="age-gate-title" className="mt-6 font-display text-3xl tracking-tight text-ink-950">
              Veliqu is not for you yet
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">
              Veliqu is only available to adults aged 18 and over. Thank you for your honesty.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
