'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './logo';
import { TrackedAnchor } from './tracked-anchor';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Discover', href: '#discover' },
  { label: 'For Creators', href: '#creators' },
  { label: 'Safety', href: '#safety' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 16);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'border-b border-ink-300/60 bg-paper-50/95 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <a href="#top" aria-label="Veliqu home" className="rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400">
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-ink-800 transition-colors duration-200 hover:text-rose-600"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <TrackedAnchor
            href="#waitlist"
            location="navbar"
            className="hidden rounded-full bg-ink-950 px-5 py-2.5 text-sm font-medium text-paper-50 transition-colors duration-200 hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 md:inline-flex"
          >
            Join Waitlist
          </TrackedAnchor>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-950 transition-colors duration-200 hover:bg-ink-950/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 md:hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <ul className="space-y-1 px-5 pb-6 pt-2 sm:px-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-ink-900 transition-colors duration-200 hover:bg-rose-100"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <TrackedAnchor
              href="#waitlist"
              location="mobile_menu"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center rounded-full bg-ink-950 px-5 py-3 text-base font-medium text-paper-50"
            >
              Join Waitlist
            </TrackedAnchor>
          </li>
        </ul>
      </div>
    </header>
  );
}
