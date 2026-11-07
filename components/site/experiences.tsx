import Image from 'next/image';
import { Compass, Handshake, MessageCircle, Search, Sparkles, UserPlus, Unlock, Coins, type LucideIcon } from 'lucide-react';
import { SectionIntro } from './section-intro';

type Feature = { icon: LucideIcon; label: string };

const datingFeatures: Feature[] = [
  { icon: Compass, label: 'Discover people' },
  { icon: Handshake, label: 'Swipe and match' },
  { icon: Sparkles, label: 'Find compatible connections' },
  { icon: MessageCircle, label: 'Start conversations' },
];

const creatorFeatures: Feature[] = [
  { icon: Search, label: 'Discover creators' },
  { icon: UserPlus, label: 'Follow personalities' },
  { icon: Unlock, label: 'Access exclusive content' },
  { icon: Coins, label: 'Support creators directly' },
];

function FeatureList({ items, tone }: { items: Feature[]; tone: 'light' | 'dark' }) {
  const isDark = tone === 'dark';
  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
      {items.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm font-medium transition duration-200 ${
            isDark
              ? 'border-ink-700 bg-ink-800/60 text-paper-50 hover:border-rose-400/60'
              : 'border-ink-300/70 bg-paper-50 text-ink-900 hover:border-rose-400'
          }`}
        >
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              isDark ? 'bg-rose-400/15 text-rose-300' : 'bg-rose-100 text-rose-700'
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          {label}
        </li>
      ))}
    </ul>
  );
}

export function Experiences() {
  return (
    <section id="about" className="scroll-mt-20 bg-paper-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionIntro
          eyebrow="Two experiences. One platform."
          title={
            <>
              Dating and creators, <span className="text-rose-600">woven together.</span>
            </>
          }
          description="Veliqu is one connected platform, not two separate apps. Connect with people you click with, and follow the creators you love in the same place."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <article className="group flex flex-col overflow-hidden rounded-[32px] bg-paper-50 ring-1 ring-ink-300/60 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-950/10">
            <div className="relative aspect-[16/11] overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/8732935/pexels-photo-8732935.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Two people sharing cappuccinos in a warm cafe"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
              />
            </div>
            <div className="flex flex-1 flex-col p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">Dating and connections</p>
              <h3 className="mt-4 font-display text-3xl tracking-tight text-ink-950">More than a swipe.</h3>
              <p className="mt-4 text-base leading-relaxed text-ink-600">
                Discover interesting people, find shared interests, match and start meaningful conversations.
              </p>
              <FeatureList items={datingFeatures} tone="light" />
            </div>
          </article>

          <article className="group flex flex-col overflow-hidden rounded-[32px] bg-ink-950 ring-1 ring-ink-800 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-950/30">
            <div className="relative aspect-[16/11] overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/29093025/pexels-photo-29093025.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="A woman photographing the city skyline at sunset from a rooftop"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">Creators and exclusive content</p>
              <h3 className="mt-4 font-display text-3xl tracking-tight text-paper-50">Discover beyond the ordinary.</h3>
              <p className="mt-4 text-base leading-relaxed text-ink-300">
                Explore creators, follow their journeys and unlock exclusive content from the people you enjoy.
              </p>
              <FeatureList items={creatorFeatures} tone="dark" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
