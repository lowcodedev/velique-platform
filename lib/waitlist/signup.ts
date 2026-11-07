import { createHash, randomInt } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { REFERRAL_CODE_PATTERN, type UserInterest } from './constants';

const REFERRAL_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 5;
const ATTEMPT_RETENTION_MS = 24 * 60 * 60 * 1000;

export type JoinWaitlistInput = {
  email: string;
  userInterest: UserInterest;
  country: string | null;
  marketingConsent: boolean;
  ageConfirmed: true;
  referredBy: string | null;
  ipAddress: string;
};

export type JoinWaitlistResult =
  | { status: 'created'; referralCode: string }
  | { status: 'exists' }
  | { status: 'rate_limited' };

function createAdminClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error('Supabase server credentials are not configured');
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function hashIpAddress(ipAddress: string) {
  return createHash('sha256').update(ipAddress).digest('hex');
}

function generateReferralCode() {
  let code = '';
  for (let index = 0; index < 8; index += 1) {
    code += REFERRAL_ALPHABET[randomInt(REFERRAL_ALPHABET.length)];
  }
  return code;
}

async function isRateLimited(
  supabase: ReturnType<typeof createAdminClient>,
  ipHash: string,
) {
  const now = Date.now();

  const { error: insertError } = await supabase
    .from('signup_attempts')
    .insert({ ip_hash: ipHash });
  if (insertError) throw insertError;

  const { error: purgeError } = await supabase
    .from('signup_attempts')
    .delete()
    .lt('created_at', new Date(now - ATTEMPT_RETENTION_MS).toISOString());
  if (purgeError) throw purgeError;

  const { count, error: countError } = await supabase
    .from('signup_attempts')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('created_at', new Date(now - RATE_LIMIT_WINDOW_MS).toISOString());
  if (countError) throw countError;

  return (count ?? 0) > RATE_LIMIT_MAX_ATTEMPTS;
}

async function findReferrerCode(
  supabase: ReturnType<typeof createAdminClient>,
  code: string,
) {
  if (!REFERRAL_CODE_PATTERN.test(code)) return null;

  const { data, error } = await supabase
    .from('waitlist_signups')
    .select('referral_code')
    .eq('referral_code', code)
    .maybeSingle();
  if (error) throw error;

  return data?.referral_code ?? null;
}

export async function joinWaitlist(input: JoinWaitlistInput): Promise<JoinWaitlistResult> {
  const supabase = createAdminClient();

  if (await isRateLimited(supabase, hashIpAddress(input.ipAddress))) {
    return { status: 'rate_limited' };
  }

  const referredBy = input.referredBy
    ? await findReferrerCode(supabase, input.referredBy)
    : null;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const referralCode = generateReferralCode();
    const { error } = await supabase.from('waitlist_signups').insert({
      email: input.email,
      user_interest: input.userInterest,
      country: input.country,
      marketing_consent: input.marketingConsent,
      age_confirmed: input.ageConfirmed,
      referral_code: referralCode,
      referred_by: referredBy,
    });

    if (!error) return { status: 'created', referralCode };
    if (error.code !== '23505') throw error;
    if (error.message.includes('referral_code')) continue;
    return { status: 'exists' };
  }

  throw new Error('Could not generate a unique referral code');
}
