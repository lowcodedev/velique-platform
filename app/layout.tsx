import './globals.css';
import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

const siteUrl = 'https://vercel.app';
const title = 'Veliqu | Dating meets the creator economy';
const description = 'Velique brings dating, social discovery and creator subscriptions together in one platform. Join the waitlist for early access.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  applicationName: 'Veliqu',
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'Veliqu',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${fraunces.variable} bg-paper-100 font-sans text-ink-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
