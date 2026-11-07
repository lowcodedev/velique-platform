import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function LegalPlaceholder({ title, body }: { title: string; body: string }) {
  return (
    <main className="flex min-h-screen items-center bg-paper-100 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <p className="font-display text-2xl font-semibold tracking-tight text-ink-950">Veliqu</p>
        <h1 className="mt-10 font-display text-4xl tracking-tight text-ink-950 sm:text-5xl">{title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-600">{body}</p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-ink-900 px-6 py-3 text-sm font-medium text-ink-950 transition duration-200 hover:bg-ink-950 hover:text-paper-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Veliqu
        </Link>
      </div>
    </main>
  );
}
