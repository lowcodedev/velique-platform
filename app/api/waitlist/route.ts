import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  REFERRAL_CODE_PATTERN,
  USER_INTEREST_VALUES,
} from '@/lib/waitlist/constants';
import { joinWaitlist } from '@/lib/waitlist/signup';

const MIN_FORM_TIME_MS = 1500;

const signupSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  userInterest: z.enum(USER_INTEREST_VALUES),
  country: z
    .string()
    .trim()
    .max(80)
    .refine((value) => value === '' || /^[\p{L}][\p{L} .'-]*$/u.test(value), 'Invalid country')
    .transform((value) => (value === '' ? null : value))
    .optional(),
  marketingConsent: z.boolean(),
  ageConfirmed: z.literal(true),
  referredBy: z
    .string()
    .trim()
    .max(16)
    .optional()
    .transform((value) => {
      const code = value?.toUpperCase() ?? '';
      return REFERRAL_CODE_PATTERN.test(code) ? code : null;
    }),
  website: z.string().max(200).optional(),
  startedAt: z.number().positive(),
});

function jsonError(status: number, message: string) {
  return NextResponse.json({ ok: false, message }, { status });
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, 'Please check your details and try again.');
  }

  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(400, 'Please check your email, choose how you want to use Veliqu and confirm you are 18 or older.');
  }

  const data = parsed.data;
  const isBot = Boolean(data.website);
  const submittedTooFast = Date.now() - data.startedAt < MIN_FORM_TIME_MS;
  if (isBot || submittedTooFast) {
    return NextResponse.json({ ok: true, status: 'created', referralCode: null });
  }

  try {
    const result = await joinWaitlist({
      email: data.email,
      userInterest: data.userInterest,
      country: data.country ?? null,
      marketingConsent: data.marketingConsent,
      ageConfirmed: data.ageConfirmed,
      referredBy: data.referredBy,
      ipAddress: getClientIp(request),
    });

    if (result.status === 'rate_limited') {
      return jsonError(429, 'Too many attempts. Please wait a few minutes and try again.');
    }

    return NextResponse.json({
      ok: true,
      status: result.status,
      referralCode: result.status === 'created' ? result.referralCode : null,
    });
  } catch (error) {
    console.error('Waitlist signup failed', error);
    return jsonError(500, 'We could not add you to the waitlist right now. Please try again shortly.');
  }
}
