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
        openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: 'Veliqu',
      locale: 'en_GB',
      type: 'website',
      images: [
        {
          url: `${siteUrl}/opengraph-image.png`, // Fixed: Combines your base URL with the image path
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
      images: [`${siteUrl}/opengraph-image.png`], // Fixed: Absolute URL for Twitter too
    },
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
