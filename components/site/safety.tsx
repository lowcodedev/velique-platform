import { Ban, BadgeCheck, BellRing, Eye, Lock, type LucideIcon } from 'lucide-react';
import { SectionIntro } from './section-intro';

const safetyFeatures: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Identity verification',
    description: 'Planned checks that help confirm people are who they say they are.',
    icon: BadgeCheck,
  },
  {
    title: 'Safer discovery',
    description: 'Discovery designed to surface profiles with care, not just volume.',
    icon: Eye,
  },
  {
    title: 'Reporting and blocking',
    description: 'Simple tools to report concerns and block anyone at any time.',
    icon: Ban,
  },
  {
    title: 'Privacy controls',
    description: 'Clear choices over what is shared, with whom, and when.',
    icon: Lock,
  },
  {
    title: 'DateGuard safety check-ins',
    description: 'Optional check-ins planned for times when you meet someone in person.',
    icon: BellRing,
  },
];

export function Safety() {
  return (
    <section id="safety" className="scroll-mt-20 bg-paper-200 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionIntro
              eyebrow="Safety and trust"
              title={
                <>
                  Connection should feel <span className="text-rose-600">exciting, not unsafe.</span>
                </>
              }
              description="We are designing Veliqu with user privacy, identity verification, safer interactions and real-world dating safety in mind."
            />
            <p className="mt-6 rounded-2xl border border-ink-300/70 bg-paper-50/70 px-5 py-4 text-sm leading-relaxed text-ink-700">
              The features below are part of the Veliqu product that is being built. They are not live yet.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {safetyFeatures.map((feature, index) => (
              <li
                key={feature.title}
                className={`group rounded-[24px] bg-paper-50 p-7 ring-1 ring-ink-300/60 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink-950/5 ${
                  index === safetyFeatures.length - 1 ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                    <feature.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-ink-300 px-3 py-1 text-xs font-medium text-ink-700">
                    In development
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl text-ink-950">{feature.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-600">{feature.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
