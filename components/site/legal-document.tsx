import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Logo } from './logo';

export type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

type LegalDocumentProps = {
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export function LegalDocument({ title, intro, lastUpdated, sections }: LegalDocumentProps) {
  return (
    <main className="min-h-screen bg-paper-100 px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Back to Veliqu home" className="rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400">
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-ink-900 px-4 py-2 text-sm font-medium text-ink-950 transition duration-200 hover:bg-ink-950 hover:text-paper-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Home
          </Link>
        </div>

        <header className="mt-16 border-b border-ink-300/70 pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">Legal</p>
          <h1 className="mt-4 font-display text-4xl tracking-tight text-ink-950 sm:text-5xl">{title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-700">{intro}</p>
          <p className="mt-4 text-sm text-ink-600">Last updated: {lastUpdated}</p>
        </header>

        <div className="mt-10 space-y-12">
          {sections.map((section, index) => (
            <section key={section.title} id={`section-${index + 1}`} className="scroll-mt-24">
              <h2 className="font-display text-2xl tracking-tight text-ink-950">
                {index + 1}. {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-700">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.items && (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-ink-700 marker:text-rose-500">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
