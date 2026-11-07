import Image from 'next/image';
import { Coins, Gift, TrendingUp, Users, Wallet, type LucideIcon } from 'lucide-react';
import { CreatorCta } from './creator-cta';

const highlights: { label: string; icon: LucideIcon }[] = [
  { label: 'Dedicated creator profiles', icon: Users },
  { label: 'Free and premium content', icon: Gift },
  { label: 'Subscriber communities', icon: Coins },
  { label: 'Monetisation opportunities', icon: Wallet },
  { label: 'Creator growth tools', icon: TrendingUp },
];

export function Creators() {
  return (
    <section id="creators" className="scroll-mt-20 bg-ink-950 py-24 text-paper-50 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px]">
            <Image
              src="https://images.pexels.com/photos/33568641/pexels-photo-33568641.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="A young creator setting up a camera in a bright studio"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-paper-50 px-5 py-4 text-ink-950 shadow-xl sm:block">
            <p className="font-display text-lg leading-tight">Your audience.</p>
            <p className="text-sm text-ink-600">Your community.</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">For creators</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.12] tracking-tight sm:text-5xl">
            Your audience. Your community. <span className="text-rose-300">Your opportunity.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">
            Veliqu gives creators an opportunity to build an audience, publish content and monetise their
            communities through subscriptions and exclusive experiences.
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {highlights.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-ink-700 bg-ink-900/60 px-4 py-4 text-sm font-medium text-paper-50 transition duration-200 hover:border-rose-400/60"
              >
                <Icon className="h-5 w-5 shrink-0 text-rose-300" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <CreatorCta />
          </div>
        </div>
      </div>
    </section>
  );
}
