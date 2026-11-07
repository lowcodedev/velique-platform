import type { Metadata } from 'next';
import { LegalPlaceholder } from '@/components/site/legal-placeholder';

export const metadata: Metadata = {
  title: 'Contact | Veliqu',
  description: 'How to get in touch with the Veliqu team.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <LegalPlaceholder
      title="Contact"
      body="Contact details will be announced soon. In the meantime, join the waitlist on the homepage to receive updates."
    />
  );
}
