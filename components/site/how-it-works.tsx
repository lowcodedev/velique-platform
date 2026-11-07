import { Compass, Link2, Sparkles, Unlock, type LucideIcon } from 'lucide-react';
import { SectionIntro } from './section-intro';

const steps: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Join',
    description: 'Create your place in the Veliqu community.',
    icon: Sparkles,
  },
  {
    title: 'Discover',
    description: 'Explore people and creators.',
    icon: Compass,
  },
  {
    title: 'Connect',
    description: 'Match, follow and engage.',
    icon: Link2,
  },
  {
    title: 'Unlock',
    description: 'Access exclusive creator content.',
    icon: Unlock,
  },
];

export function HowItWorks() {
  return (
    <section id="discover" className="scroll-mt-20 border-y border-ink-300/50 bg-paper-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionIntro
          eyebrow="How Veliqu works"
          title={
            <>
              From first step to <span className="text-rose-600">first connection.</span>
            </>
          }
          description="A simple path that takes you from joining to everything Veliqu has to offer."
        />

        <ol className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-rose-300 via-ink-300 to-rose-300 lg:block"
          />
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="group relative rounded-[28px] border border-ink-300/70 bg-paper-100 p-7 transition duration-300 hover:-translate-y-1 hover:border-rose-300 hover:bg-paper-50 hover:shadow-lg hover:shadow-ink-950/5"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-paper-50 ring-1 ring-ink-300 transition-colors duration-300 group-hover:bg-ink-950 group-hover:ring-ink-950">
                  <step.icon
                    className="h-6 w-6 text-rose-600 transition-colors duration-300 group-hover:text-rose-300"
                    aria-hidden="true"
                  />
                </span>
                <span className="font-display text-5xl leading-none text-ink-300">0{index + 1}</span>
              </div>
              <h3 className="mt-8 font-display text-2xl text-ink-950">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
