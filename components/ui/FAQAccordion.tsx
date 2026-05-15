'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

function LinkedAnswer({ text }: { text: string }) {
  const paragraphs = text.split('\n\n').filter(Boolean);
  return (
    <div className="space-y-3">
      {paragraphs.map((para, j) => (
        <p key={j} className="text-brand-gray font-body text-sm leading-relaxed">
          {splitAnswerLinks(para)}
        </p>
      ))}
    </div>
  );
}

function splitAnswerLinks(part: string): ReactNode[] {
  const re = /\[\[LINK:([^|]+)\|([^\]]+)\]\]/g;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(part)) !== null) {
    if (m.index > last) {
      out.push(<span key={key++}>{part.slice(last, m.index)}</span>);
    }
    const href = m[1];
    const label = m[2];
    out.push(
      <Link
        key={key++}
        href={href}
        className="text-brand-teal underline underline-offset-2 hover:text-brand-offwhite transition-colors"
      >
        {label}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (last < part.length) {
    out.push(<span key={key++}>{part.slice(last)}</span>);
  }
  return out.length ? out : [<span key={0}>{part}</span>];
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export default function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-brand-charcoal border border-brand-teal/20 rounded-xl overflow-hidden"
        >
          <button
            id={`faq-trigger-${index}`}
            type="button"
            aria-expanded={openIndex === index}
            aria-controls={`faq-panel-${index}`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left"
          >
            <span className="font-body text-brand-offwhite pr-4">{item.question}</span>
            <motion.span
              animate={{ rotate: openIndex === index ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-brand-teal text-2xl flex-shrink-0"
            >
              +
            </motion.span>
          </button>
          <div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-trigger-${index}`}
            className={cn(
              'overflow-hidden transition-[max-height,opacity] duration-300 ease-out',
              openIndex === index ? 'max-h-[3200px] opacity-100' : 'max-h-0 opacity-0',
            )}
          >
            <div className="px-6 pb-5">
              <LinkedAnswer text={item.answer} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
