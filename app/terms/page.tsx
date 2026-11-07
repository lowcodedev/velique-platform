import type { Metadata } from 'next';
import { LegalDocument, type LegalSection } from '@/components/site/legal-document';

export const metadata: Metadata = {
  title: 'Terms of Service | Veliqu',
  description: 'The terms that apply when you use the Veliqu website and join the waitlist.',
  alternates: { canonical: '/terms' },
};

const sections: LegalSection[] = [
  {
    title: 'Agreement to these terms',
    paragraphs: [
      'These Terms of Service govern your use of the Veliqu website and waitlist. By visiting the site or joining the waitlist, you agree to these terms. If you do not agree, please do not use the site.',
    ],
  },
  {
    title: 'Age requirement',
    paragraphs: [
      'Veliqu is an exclusive platform for adults. You must be at least 18 years old to use this website and to join the waitlist. When you join, you confirm that you meet this requirement. If you are under 18, you must leave the site immediately.',
    ],
  },
  {
    title: 'The waitlist',
    paragraphs: [
      'Joining the waitlist gives you a place on our list to receive early access updates. It does not guarantee access to Veliqu, a launch date, a particular feature, availability in any country or any pricing. We may change, delay or cancel plans for Veliqu at any time, and we will tell you about material changes where appropriate.',
    ],
  },
  {
    title: 'Planned features',
    paragraphs: [
      'Veliqu is being built. Features described on this website, including identity verification, safer discovery, reporting and blocking, privacy controls and DateGuard safety check-ins, are planned rather than operational. Descriptions of planned features may change before or after launch.',
    ],
  },
  {
    title: 'Referrals',
    paragraphs: [
      'Once you have joined the waitlist, you may share your personal referral link with others. Referral links must be shared honestly. You must not send unsolicited messages, create fake sign-ups, buy or sell referrals, or use referral links in a way that is misleading or harassing. Referrals do not currently carry rewards, and we may change this programme at any time.',
    ],
  },
  {
    title: 'Acceptable use of this website',
    paragraphs: [
      'When using this website you agree not to:',
    ],
    items: [
      'Provide false information, including someone else\'s email address or age.',
      'Use automated scripts, bots or scrapers to submit forms, collect data or overload the site.',
      'Attempt to access information you are not authorised to view, or interfere with the security or operation of the site.',
      'Use the site for unlawful, harmful, abusive or fraudulent purposes.',
    ],
  },
  {
    title: 'Your information',
    paragraphs: [
      'The information you provide when joining the waitlist is handled in line with our Privacy Policy. Please read it to understand how we use and protect your details.',
    ],
  },
  {
    title: 'Intellectual property',
    paragraphs: [
      'The Veliqu name, wordmark, design, text and other content on this website are owned by or licensed to Veliqu. You may view and share the site for personal, non-commercial purposes. You may not copy, modify, distribute or reuse our content or brand without our written permission.',
    ],
  },
  {
    title: 'Third-party content',
    paragraphs: [
      'Some images on this website are licensed stock photography and are shown for illustration only. They do not depict Veliqu members or creators.',
    ],
  },
  {
    title: 'Disclaimers',
    paragraphs: [
      'This website and waitlist are provided "as is" and "as available". We do not guarantee that the site will always be available, error-free or secure. To the fullest extent permitted by law, we exclude liability for loss arising from your use of the website, except where the law does not allow such exclusions.',
    ],
  },
  {
    title: 'Removing your place on the waitlist',
    paragraphs: [
      'You may ask us to remove you from the waitlist at any time. We may remove entries that breach these terms or that were created with false information.',
    ],
  },
  {
    title: 'Changes to these terms',
    paragraphs: [
      'We may update these terms from time to time. The date at the top of this page shows when they were last changed. Continuing to use the website after a change means you accept the updated terms.',
    ],
  },
  {
    title: 'Governing law',
    paragraphs: [
      'These terms are governed by the laws that will be confirmed in our full terms before launch. Until then, please contact us with any questions about how they apply to you.',
    ],
  },
  {
    title: 'Contact us',
    paragraphs: [
      'If you have questions about these terms, please visit the Contact page of this website. Our contact details will be announced soon.',
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Service"
      intro="These terms explain the rules for using the Veliqu website and joining the waitlist, including the requirement that all members are 18 or older."
      lastUpdated="7 November 2026"
      sections={sections}
    />
  );
}
