import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { TrackedAnchor } from './tracked-anchor';
import { WaitlistForm } from './waitlist-form';

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-paper-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-rose-200/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-paper-300/70 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-28 lg:pt-40">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 motion-reduce:animate-none lg:col-span-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">
            Dating meets the creator economy
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-ink-950 sm:text-6xl lg:text-7xl">
            Meet people.
            <br />
            Discover creators.
            <br />
            <span className="text-rose-600">Find your connection.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-700">
            Veliqu brings dating, social discovery and creator subscriptions together in one exciting
            experience. Whether you are looking to connect, discover new personalities or grow your
            audience, there is a place for you.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <TrackedAnchor
              href="#waitlist"
              location="hero_primary"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink-950 px-7 py-3.5 text-base font-medium text-paper-50 transition duration-200 hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-100"
            >
              Join the Waitlist
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </TrackedAnchor>
            <TrackedAnchor
              href="#about"
              location="hero_secondary"
              className="inline-flex items-center justify-center rounded-full border border-ink-900 px-7 py-3.5 text-base font-medium text-ink-950 transition duration-200 hover:bg-ink-950 hover:text-paper-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-100"
            >
              Explore Veliqu
            </TrackedAnchor>
          </div>

          <div className="mt-10 max-w-xl rounded-[28px] border border-ink-300/60 bg-paper-50/80 p-5 shadow-sm backdrop-blur-sm sm:p-6">
            <WaitlistForm variant="hero" />
          </div>
        </div>

        <div className="relative animate-in fade-in zoom-in-95 duration-1000 motion-reduce:animate-none lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-paper-300 shadow-2xl shadow-ink-950/10 sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="https://images.pexels.com/photos/21606905/pexels-photo-21606905.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="A couple laughing together outdoors, sharing an easy moment"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/70 to-transparent p-6 pt-20">
              <div className="flex flex-wrap gap-2">
                {['Discover people', 'Follow creators', 'Unlock exclusives'].map((label) => (
                  <span
                    key={label}
                    className="rounded-full bg-paper-50/95 px-4 py-1.5 text-xs font-medium text-ink-900"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
