'use client';
import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  emitSchema?: boolean;
}

export function FaqAccordion({ items, emitSchema = true }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  return (
    <>
      {emitSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <div className="divide-y divide-brand-charcoal">
        {items.map((item, i) => (
          <div key={i}>
            <button
              className="flex w-full items-center justify-between py-4 text-left font-body text-brand-offwhite"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`faq-panel-${i}`}
            >
              <span className="font-medium">{item.question}</span>
              <span className="ml-4 shrink-0 text-brand-teal-light">
                {open === i ? '−' : '+'}
              </span>
            </button>
            {open === i && (
              <div id={`faq-panel-${i}`} className="pb-4 font-body text-brand-gray text-sm leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
