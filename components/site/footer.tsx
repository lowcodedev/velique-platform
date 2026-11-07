import { Instagram, Linkedin, Youtube, type LucideIcon } from 'lucide-react';
import { Logo } from './logo';

const companyLinks = [
  { label: 'About', href: '#about' },
  { label: 'Safety', href: '#safety' },
  { label: 'Contact', href: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

const socials: { label: string; icon: LucideIcon }[] = [
  { label: 'Instagram', icon: Instagram },
  { label: 'LinkedIn', icon: Linkedin },
  { label: 'YouTube', icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-ink-950 text-paper-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-12 md:gap-10 lg:py-20">
        <div className="md:col-span-5">
          <Logo tone="dark" />
          <p className="mt-4 max-w-sm text-base leading-relaxed text-ink-300">
            Dating meets the creator economy. One exclusive platform for adults to meet people, discover creators and connect.
          </p>
          <div className="mt-8 flex items-center gap-3">
            {socials.map(({ label, icon: Icon }) => (
              <span
                key={label}
                aria-label={`${label} (coming soon)`}
                title={`${label} coming soon`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-700 text-ink-300"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>

        <nav aria-label="Company" className="md:col-span-3 md:col-start-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">Company</p>
          <ul className="mt-5 space-y-3">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-base text-ink-200 transition-colors duration-200 hover:text-paper-50">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal" className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">Legal</p>
          <ul className="mt-5 space-y-3">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-base text-ink-200 transition-colors duration-200 hover:text-paper-50">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-ink-800">
        <p className="mx-auto max-w-7xl px-5 py-6 text-sm text-ink-400 sm:px-8">
          &copy; {new Date().getFullYear()} Veliqu. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
