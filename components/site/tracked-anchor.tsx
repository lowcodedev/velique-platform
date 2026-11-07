'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics';

type TrackedAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  location: string;
  children: ReactNode;
};

export function TrackedAnchor({ location, children, onClick, ...props }: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent('cta_click', { location, label: props.href ?? '' });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
