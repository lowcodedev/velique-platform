import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SectionIntro } from './section-intro';

const faqs = [
  {
    question: 'Who can join Veliqu?',
    answer:
      'Veliqu is an exclusive platform for adults. You must be 18 or older to enter the site or join the waitlist.',
  },
  {
    question: 'What is Veliqu?',
    answer:
      'Veliqu is a new platform that brings dating, social discovery and creator subscriptions together. You can meet people, discover creators and access exclusive content in one place.',
  },
  {
    question: 'Is Veliqu a dating app?',
    answer:
      'Veliqu includes dating and connection features, but it is not only a dating app. It is one connected platform that also gives people a way to discover and support creators.',
  },
  {
    question: 'Can I become a creator on Veliqu?',
    answer:
      'Yes. Creators are a core part of Veliqu. Join the waitlist and select Creator to be considered for early creator access.',
  },
  {
    question: 'Will creators be able to earn money?',
    answer:
      'Creators are planned to be able to monetise their communities through subscriptions and exclusive content. Details about how this works will be announced before launch.',
  },
  {
    question: 'Is Veliqu free?',
    answer:
      'Pricing has not been announced yet. We will share full details about what is free and what is paid before Veliqu launches.',
  },
  {
    question: 'When is Veliqu launching?',
    answer:
      'We do not have a launch date to share yet. Join the waitlist to receive updates as soon as we have news to announce.',
  },
  {
    question: 'Is Veliqu safe?',
    answer:
      'Safety is central to how we are designing Veliqu. Identity verification, reporting and blocking, privacy controls and DateGuard check-ins are planned features that are still in development.',
  },
  {
    question: 'Which countries will Veliqu support?',
    answer:
      'Launch regions have not been confirmed yet. We will announce supported countries as our plans are finalised. You can share your country when you join the waitlist.',
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-paper-50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionIntro
            eyebrow="FAQ"
            title={
              <>
                Questions, <span className="text-rose-600">answered plainly.</span>
              </>
            }
            description="Still curious? Join the waitlist and we will keep you updated as Veliqu takes shape."
          />
        </div>

        <Accordion type="single" collapsible className="lg:col-span-8">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="border-ink-300/80 px-1"
            >
              <AccordionTrigger className="py-6 text-left font-display text-xl text-ink-950 hover:no-underline hover:text-rose-700 [&[data-state=open]]:text-rose-700">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-ink-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
