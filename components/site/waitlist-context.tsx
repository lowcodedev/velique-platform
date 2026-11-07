'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { UserInterest } from '@/lib/waitlist/constants';

type WaitlistContextValue = {
  interest: UserInterest | null;
  setInterest: (interest: UserInterest) => void;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [interest, setInterest] = useState<UserInterest | null>(null);
  const value = useMemo(() => ({ interest, setInterest }), [interest]);

  return <WaitlistContext.Provider value={value}>{children}</WaitlistContext.Provider>;
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (!context) throw new Error('useWaitlist must be used within WaitlistProvider');
  return context;
}
