/*
# Create Veliqu waitlist tables

1. New Tables
- `waitlist_signups`: one row per person who joins the waitlist.
  - `id` (uuid, primary key)
  - `email` (text, unique, required, stored lowercase and trimmed)
  - `user_interest` (text, required: 'dating', 'creator' or 'both')
  - `country` (text, optional)
  - `referral_code` (text, unique, generated for each signup)
  - `referred_by` (text, optional, the referral code of the person who invited them)
  - `marketing_consent` (boolean)
  - `email_verified` (boolean, defaults to false)
  - `status` (text: 'pending', 'verified' or 'invited', defaults to 'pending')
  - `created_at` (timestamptz)
- `signup_attempts`: short-lived log of waitlist submissions used for rate limiting.
  - `id` (uuid, primary key)
  - `ip_hash` (text, a one-way hash of the visitor's IP address, never the raw address)
  - `created_at` (timestamptz)

2. Security
- Row level security is enabled on both tables with no policies, so anonymous and signed-in browser users cannot read, change or count any rows.
- Only the server role (used by the signup route) is granted access, and only the verbs it needs.
- Administrators read the full waitlist from the database dashboard.

3. Notes
- All statements are idempotent, so the migration is safe to re-run.
- Signup validation is enforced in the server route and again by these table constraints.
*/

CREATE TABLE IF NOT EXISTS waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  user_interest text NOT NULL,
  country text,
  referral_code text NOT NULL UNIQUE,
  referred_by text,
  marketing_consent boolean NOT NULL DEFAULT false,
  email_verified boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT waitlist_signups_email_normalised CHECK (email = lower(btrim(email)) AND position('@' in email) > 1),
  CONSTRAINT waitlist_signups_interest_valid CHECK (user_interest IN ('dating', 'creator', 'both')),
  CONSTRAINT waitlist_signups_status_valid CHECK (status IN ('pending', 'verified', 'invited'))
);

CREATE INDEX IF NOT EXISTS waitlist_signups_referred_by_idx ON waitlist_signups (referred_by);
CREATE INDEX IF NOT EXISTS waitlist_signups_created_at_idx ON waitlist_signups (created_at);

ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON waitlist_signups FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON waitlist_signups TO service_role;

CREATE TABLE IF NOT EXISTS signup_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS signup_attempts_ip_created_idx ON signup_attempts (ip_hash, created_at);

ALTER TABLE signup_attempts ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON signup_attempts FROM anon, authenticated;
GRANT SELECT, INSERT, DELETE ON signup_attempts TO service_role;
