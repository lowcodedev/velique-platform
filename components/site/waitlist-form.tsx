'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Check, Copy, Loader2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { USER_INTEREST_OPTIONS, type UserInterest } from '@/lib/waitlist/constants';
import { useWaitlist } from './waitlist-context';

type FormVariant = 'hero' | 'section';

type SignupResponse = {
  ok: boolean;
  status?: 'created' | 'exists';
  referralCode?: string | null;
  message?: string;
};

type SignupSuccess = {
  referralUrl: string | null;
  alreadyJoined: boolean;
};

const inputClass =
  'w-full rounded-full border border-ink-300 bg-paper-50 px-5 py-3 text-base text-ink-900 placeholder:text-ink-600 transition duration-200 focus:border-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-300';

const labelClass = 'mb-2 block text-sm font-medium text-ink-800';

export function WaitlistForm({ variant }: { variant: FormVariant }) {
  const { interest, setInterest } = useWaitlist();
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [website, setWebsite] = useState('');
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<SignupSuccess | null>(null);
  const [copied, setCopied] = useState(false);
  const startedAt = useRef(0);
  const fieldPrefix = `waitlist-${variant}`;

  useEffect(() => {
    startedAt.current = Date.now();
    const ref = new URLSearchParams(window.location.search).get('ref');
    if (ref) setReferredBy(ref);
    trackEvent('waitlist_form_view', { variant });
  }, [variant]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  function handleInterestChange(value: UserInterest) {
    setInterest(value);
    setErrorMessage(null);
    trackEvent('interest_selected', { interest: value, variant });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!interest) {
      setErrorMessage('Choose how you want to use Veliqu.');
      return;
    }
    if (!ageConfirmed) {
      setErrorMessage('Please confirm you are 18 or older to join.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          userInterest: interest,
          country,
          marketingConsent,
          ageConfirmed,
          referredBy,
          website,
          startedAt: startedAt.current,
        }),
      });
      const payload = (await response.json().catch(() => null)) as SignupResponse | null;

      if (!response.ok || !payload?.ok) {
        throw new Error(
          payload?.message ?? 'We could not add you to the waitlist. Please try again.',
        );
      }

      const alreadyJoined = payload.status === 'exists';
      const referralUrl = payload.referralCode
        ? `${window.location.origin}/?ref=${payload.referralCode}`
        : null;

      setSuccess({ referralUrl, alreadyJoined });
      if (!alreadyJoined) {
        trackEvent('waitlist_signup_success', {
          variant,
          interest,
          referred: referredBy !== null,
        });
      }
      if (referredBy) trackEvent('referral_registration', { variant, interest });
    } catch (caught) {
      setErrorMessage(
        caught instanceof Error ? caught.message : 'Something went wrong. Please try again.',
      );
      trackEvent('waitlist_signup_error', { variant });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function copyReferralUrl(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (success) {
    return (
      <div role="status" className="animate-in fade-in zoom-in-95 duration-500 motion-reduce:animate-none">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 text-sage-700">
          <Check className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-2xl text-ink-950">You are on the list</h3>
        <p className="mt-2 text-base leading-relaxed text-ink-600">
          {success.alreadyJoined
            ? 'This email is already on the Veliqu waitlist. We will send early access updates to it.'
            : 'Thanks for joining. We will send early access updates to your inbox.'}
        </p>
        {success.referralUrl && (
          <div className="mt-6">
            <p className="text-sm font-medium text-ink-800">Know someone who would enjoy Veliqu?</p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                readOnly
                value={success.referralUrl}
                aria-label="Your referral link"
                className="min-w-0 flex-1 truncate rounded-full border border-ink-300 bg-paper-50 px-5 py-3 text-sm text-ink-800"
              />
              <button
                type="button"
                onClick={() => copyReferralUrl(success.referralUrl as string)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-900 px-5 py-3 text-sm font-medium text-ink-900 transition duration-200 hover:bg-ink-900 hover:text-paper-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              >
                {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                {copied ? 'Copied' : 'Copy link'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${fieldPrefix}-website`}>Website</label>
        <input
          id={`${fieldPrefix}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor={`${fieldPrefix}-email`} className={labelClass}>
          Email address
        </label>
        <div className={variant === 'hero' ? 'flex flex-col gap-3 sm:flex-row' : ''}>
          <input
            id={`${fieldPrefix}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isSubmitting}
            className={inputClass}
          />
          {variant === 'hero' && (
            <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {isSubmitting ? 'Joining' : 'Join the Waitlist'}
            </button>
          )}
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>I am interested in</legend>
        <div className="flex flex-wrap gap-2">
          {USER_INTEREST_OPTIONS.map((option) => (
            <label key={option.value} className="cursor-pointer">
              <input
                type="radio"
                name={`${fieldPrefix}-interest`}
                value={option.value}
                checked={interest === option.value}
                onChange={() => handleInterestChange(option.value)}
                disabled={isSubmitting}
                className="peer sr-only"
              />
              <span className="inline-flex rounded-full border border-ink-300 bg-paper-50 px-5 py-2.5 text-sm font-medium text-ink-800 transition duration-200 hover:border-ink-700 peer-checked:border-ink-950 peer-checked:bg-ink-950 peer-checked:text-paper-50 peer-focus-visible:ring-2 peer-focus-visible:ring-rose-400">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-700">
        <input
          type="checkbox"
          name="ageConfirmed"
          checked={ageConfirmed}
          onChange={(event) => setAgeConfirmed(event.target.checked)}
          disabled={isSubmitting}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-400 accent-rose-600"
        />
        <span>I confirm I am 18 years of age or older.</span>
      </label>

      {variant === 'section' && (
        <>
          <div>
            <label htmlFor={`${fieldPrefix}-country`} className={labelClass}>
              Country <span className="font-normal text-ink-600">(optional)</span>
            </label>
            <input
              id={`${fieldPrefix}-country`}
              name="country"
              type="text"
              autoComplete="country-name"
              maxLength={80}
              placeholder="Where are you based?"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              disabled={isSubmitting}
              className={inputClass}
            />
          </div>

          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-700">
            <input
              type="checkbox"
              name="marketingConsent"
              checked={marketingConsent}
              onChange={(event) => setMarketingConsent(event.target.checked)}
              disabled={isSubmitting}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-400 accent-rose-600"
            />
            <span>
              Send me waitlist updates and news about Veliqu. You can unsubscribe at any time.
            </span>
          </label>

          <button type="submit" disabled={isSubmitting} className={`${primaryButtonClass} w-full sm:w-auto`}>
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {isSubmitting ? 'Joining the waitlist' : 'Join Waitlist'}
          </button>
        </>
      )}

      {errorMessage && (
        <p role="alert" className="rounded-2xl bg-ember-100 px-4 py-3 text-sm text-ember-700">
          {errorMessage}
        </p>
      )}
    </form>
  );
}

const primaryButtonClass =
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink-950 px-7 py-3 text-base font-medium text-paper-50 transition duration-200 hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-100 disabled:cursor-not-allowed disabled:opacity-70';
