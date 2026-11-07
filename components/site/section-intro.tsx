import type { ReactNode } from 'react';

type SectionIntroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  tone?: 'light' | 'dark';
};

export function SectionIntro({ eyebrow, title, description, tone = 'light' }: SectionIntroProps) {
  const isDark = tone === 'dark';

  return (
    <div className="max-w-2xl">
      <p
        className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-rose-300' : 'text-rose-600'}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-display text-4xl leading-[1.12] tracking-tight sm:text-5xl ${isDark ? 'text-paper-50' : 'text-ink-950'}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-lg leading-relaxed ${isDark ? 'text-ink-300' : 'text-ink-600'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
