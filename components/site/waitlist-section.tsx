import { SectionIntro } from './section-intro';
import { WaitlistForm } from './waitlist-form';

export function WaitlistSection() {
  return (
    <section id="waitlist" className="scroll-mt-20 relative overflow-hidden bg-paper-100 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-rose-200/50 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionIntro
            eyebrow="Waitlist"
            title={
              <>
                Be there <span className="text-rose-600">from the beginning.</span>
              </>
            }
            description="Veliqu is coming. Get early access updates and be among the first to experience a new way to connect and discover."
          />
        </div>

        <div className="rounded-[32px] bg-paper-50 p-7 shadow-xl shadow-ink-950/5 ring-1 ring-ink-300/60 sm:p-10 lg:col-span-7">
          <WaitlistForm variant="section" />
        </div>
      </div>
    </section>
  );
}
