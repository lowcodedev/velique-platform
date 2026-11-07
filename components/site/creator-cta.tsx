'use client';

import { trackEvent } from '@/lib/analytics';
import { useWaitlist } from './waitlist-context';
import { ArrowRight } from 'lucide-react';

export function CreatorCta() {
  const { setInterest } = useWaitlist();

  return (
    <a
      href="#waitlist"
      onClick={() => {
        setInterest('creator');
        trackEvent('cta_click', { location: 'creators_section', label: 'join_as_early_creator' });
      }}
      className="group inline-flex items-center justify-center gap-2 rounded-full bg-paper-50 px-7 py-3.5 text-base font-medium text-ink-950 transition duration-200 hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
    >
      Join as an Early Creator
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
    </a>
  );
}
