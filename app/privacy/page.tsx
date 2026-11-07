import type { Metadata } from 'next';
import { LegalDocument, type LegalSection } from '@/components/site/legal-document';

export const metadata: Metadata = {
  title: 'Privacy Policy | Veliqu',
  description: 'How Veliqu collects, uses, stores and protects the personal information you share when joining the waitlist.',
  alternates: { canonical: '/privacy' },
};

const sections: LegalSection[] = [
  {
    title: 'Who we are',
    paragraphs: [
      'Veliqu is a dating, social discovery and creator subscription platform that is currently in development. This Privacy Policy explains how we handle personal information when you visit our website, join the waitlist or interact with us about Veliqu.',
      'When this policy says "we", "us" or "Veliqu", it means the team responsible for the Veliqu website and waitlist. Our full legal entity and contact details will be published before launch.',
    ],
  },
  {
    title: 'Who can use Veliqu',
    paragraphs: [
      'Veliqu is an exclusive platform for adults. You must be 18 years of age or older to enter this website and to join the waitlist. We do not knowingly collect personal information from anyone under 18. If we learn that we have done so, we will delete it promptly.',
    ],
  },
  {
    title: 'Information we collect',
    paragraphs: [
      'We only collect what we need to run the waitlist and keep it safe:',
    ],
    items: [
      'Email address, which we store in lowercase form so duplicate sign-ups can be prevented.',
      'How you want to use Veliqu: dating, creator or both.',
      'Country, if you choose to share it. This field is optional.',
      'Whether you agreed to receive marketing updates.',
      'Your confirmation that you are 18 or older.',
      'Referral information: the unique referral code created for you and, if you arrived through someone else\'s link, that person\'s referral code.',
      'A one-way hashed version of your IP address, used only to limit repeated sign-up attempts. We never store your raw IP address for the waitlist.',
      'Anonymous usage events, such as page visits, form views, button clicks and successful sign-ups, used to understand how the site performs.',
    ],
  },
  {
    title: 'How we use your information',
    paragraphs: [
      'We use your information to add you to the waitlist, confirm your place, send early access updates if you have agreed to receive them, track referrals, prevent spam and abuse, and understand which parts of the site are useful.',
      'We do not sell your personal information. We do not use it to show you personalised advertising on other websites.',
    ],
  },
  {
    title: 'Referrals',
    paragraphs: [
      'When you join the waitlist you receive a referral link. If someone else uses your link to join, we record that relationship using referral codes. We do not show anyone else\'s personal details to you, and we do not show your details to others through referrals.',
    ],
  },
  {
    title: 'Our legal basis',
    paragraphs: [
      'Where UK or EU data protection law applies, we rely on your consent to send marketing updates, which you can withdraw at any time. We rely on our legitimate interest in running a secure waitlist, preventing abuse and improving the site. Where we need to keep information to meet a legal obligation, we will do so.',
    ],
  },
  {
    title: 'Who we share information with',
    paragraphs: [
      'We share information only with service providers that help us run the waitlist, such as our database provider and our website host. They process information on our instructions and under contractual protections. We may also disclose information if the law requires it.',
    ],
  },
  {
    title: 'How long we keep information',
    paragraphs: [
      'We keep waitlist records until Veliqu launches or until you ask us to delete them, whichever comes first. Records of sign-up attempts used for rate limiting are deleted automatically after 24 hours. Anonymous usage events are kept only as long as needed to measure the site.',
    ],
  },
  {
    title: 'How we protect your information',
    paragraphs: [
      'Waitlist data is stored in a secure database that is not accessible to visitors of this website. Only authorised administrators can view the full waitlist. Information is sent over encrypted connections, and our sign-up process checks submissions on the server, applies bot protection and limits repeated attempts.',
      'No system is completely secure, so we cannot guarantee absolute security. If we become aware of a breach that affects your information, we will tell you and the relevant authorities as required by law.',
    ],
  },
  {
    title: 'Your choices and rights',
    paragraphs: [
      'You can ask us at any time to access the information we hold about you, correct it, delete it, or stop using it for marketing. You can unsubscribe from marketing updates through the link in any update we send. Depending on where you live, you may also have the right to complain to your local data protection authority.',
    ],
  },
  {
    title: 'Local storage and cookies',
    paragraphs: [
      'We store a single setting in your browser to remember that you have confirmed you are 18 or older, so the age check does not appear on every visit. We do not use advertising cookies on this website.',
    ],
  },
  {
    title: 'International transfers',
    paragraphs: [
      'Our service providers may process information in countries other than your own. Where this happens, we take steps to make sure the information is protected in line with applicable law.',
    ],
  },
  {
    title: 'Changes to this policy',
    paragraphs: [
      'We may update this Privacy Policy as Veliqu develops. When we make material changes, we will update the date at the top of this page and, where appropriate, let waitlist members know.',
    ],
  },
  {
    title: 'Contact us',
    paragraphs: [
      'If you have questions about this Privacy Policy or want to exercise your rights, please contact us. Our contact details will be announced soon, and you can reach us through the Contact page of this website.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      intro="Your privacy matters to us. This policy explains what information we collect when you join the Veliqu waitlist, why we collect it and the choices you have."
      lastUpdated="7 November 2026"
      sections={sections}
    />
  );
}
