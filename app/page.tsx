import { AgeGate } from '@/components/site/age-gate';
import { Creators } from '@/components/site/creators';
import { Experiences } from '@/components/site/experiences';
import { Faq } from '@/components/site/faq';
import { Footer } from '@/components/site/footer';
import { Hero } from '@/components/site/hero';
import { HowItWorks } from '@/components/site/how-it-works';
import { Navbar } from '@/components/site/navbar';
import { PageViewTracker } from '@/components/site/page-view-tracker';
import { Safety } from '@/components/site/safety';
import { WaitlistProvider } from '@/components/site/waitlist-context';
import { WaitlistSection } from '@/components/site/waitlist-section';

export default function Home() {
  return (
    <WaitlistProvider>
      <AgeGate />
      <PageViewTracker />
      <Navbar />
      <main>
        <Hero />
        <Experiences />
        <HowItWorks />
        <Creators />
        <Safety />
        <WaitlistSection />
        <Faq />
      </main>
      <Footer />
    </WaitlistProvider>
  );
}
