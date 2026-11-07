import './globals.css';
import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

// Use your real deployed domain. Set NEXT_PUBLIC_SITE_URL in Vercel env vars.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

const title = 'Veliqu | Dating meets the creator economy';
const description =
  'Veliqu brings dating, social discovery and creator subscriptions together in one platform. Join the waitlist for early access.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  applicationName: 'Veliqu',
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Veliqu',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png', // resolved against metadataBase
        width: 1200,
        height: 630,
        alt: 'Veliqu Preview Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image.png'],
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
