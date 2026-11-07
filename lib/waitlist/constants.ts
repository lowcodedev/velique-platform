export const USER_INTEREST_VALUES = ['dating', 'creator', 'both'] as const;

export type UserInterest = (typeof USER_INTEREST_VALUES)[number];

export const USER_INTEREST_OPTIONS: { value: UserInterest; label: string }[] = [
  { value: 'dating', label: 'Dating' },
  { value: 'creator', label: 'Creator' },
  { value: 'both', label: 'Both' },
];

export const REFERRAL_CODE_PATTERN = /^[A-Z2-9]{8}$/;
