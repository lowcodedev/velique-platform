/*
# Require 18+ confirmation for waitlist signups

1. Modified Tables
- `waitlist_signups`: new column `age_confirmed` (boolean, defaults to false). It records that the person confirmed they are 18 or older.

2. Constraints
- A check constraint requires `age_confirmed` to be true for new rows. It is added as NOT VALID so any rows that existed before this migration are not rejected.

3. Security
- No change to access. Row level security stays enabled with no browser policies.

4. Notes
- The statements are idempotent, so the migration is safe to re-run.
*/

ALTER TABLE waitlist_signups ADD COLUMN IF NOT EXISTS age_confirmed boolean NOT NULL DEFAULT false;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'waitlist_signups_age_confirmed_required'
  ) THEN
    ALTER TABLE waitlist_signups
      ADD CONSTRAINT waitlist_signups_age_confirmed_required CHECK (age_confirmed) NOT VALID;
  END IF;
END $$;
