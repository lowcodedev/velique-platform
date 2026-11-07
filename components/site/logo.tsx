import { Gem } from 'lucide-react';

type LogoProps = {
  tone?: 'light' | 'dark';
  className?: string;
};

export function Logo({ tone = 'light', className = '' }: LogoProps) {
  const textClass = tone === 'dark' ? 'text-paper-50' : 'text-ink-950';

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-ink-950 shadow-md shadow-ink-950/20 ring-1 ring-rose-300/40">
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-rose-500/40 via-transparent to-transparent"
        />
        <Gem className="relative h-[1.1rem] w-[1.1rem] text-rose-200" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.45rem] font-semibold tracking-tight ${textClass}`}>Veliqu</span>
        <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-rose-600">
          Dating &amp; Creators
        </span>
      </span>
    </span>
  );
}
