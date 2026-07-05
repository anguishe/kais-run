/**
 * Extracts the FAQ section from a post's MDX body and builds FAQPage JSON-LD.
 *
 * Convention in content/blog/*.mdx: an H2 titled "## FAQ" or
 * "## Frequently Asked Questions", followed by question/answer pairs where each
 * question is a bold line (`**Question?**`) and the answer is the plain
 * paragraph(s) beneath it, until the next bold question or the next `## ` heading.
 *
 * Returns null when no FAQ section (or fewer than 2 pairs) is found, so callers
 * can conditionally render the schema.
 */

const FAQ_HEADING = /^##\s+(faq|frequently asked questions)\s*$/i;
const NEXT_H2 = /^##\s+/;
const QUESTION_LINE = /^\*\*(.+?)\*\*\s*$/;

/** Strip inline markdown (links, bold/italic, code) down to plain text for schema. */
function toPlainText(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [text](url) -> text
    .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
    .replace(/\*([^*]+)\*/g, '$1') // italic
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/\s+/g, ' ')
    .trim();
}

export type FaqPair = { question: string; answer: string };

export function extractFaqPairs(body: string): FaqPair[] {
  const lines = body.split('\n');

  // Locate the FAQ section bounds.
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (FAQ_HEADING.test(lines[i].trim())) {
      start = i + 1;
      break;
    }
  }
  if (start === -1) return [];

  let end = lines.length;
  for (let i = start; i < lines.length; i++) {
    if (NEXT_H2.test(lines[i].trim())) {
      end = i;
      break;
    }
  }

  const pairs: FaqPair[] = [];
  let currentQ: string | null = null;
  let answerBuf: string[] = [];

  const flush = () => {
    if (currentQ) {
      const answer = toPlainText(answerBuf.join(' '));
      if (answer) pairs.push({ question: toPlainText(currentQ), answer });
    }
    currentQ = null;
    answerBuf = [];
  };

  for (let i = start; i < end; i++) {
    const raw = lines[i].trim();
    const qMatch = raw.match(QUESTION_LINE);
    if (qMatch) {
      flush();
      currentQ = qMatch[1];
    } else if (currentQ && raw) {
      answerBuf.push(raw);
    }
  }
  flush();

  return pairs;
}

export function buildFaqSchema(slug: string, body: string) {
  const pairs = extractFaqPairs(body);
  if (pairs.length < 2) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `https://kaisrun.xyz/blog/${slug}/#faq`,
    mainEntity: pairs.map((p) => ({
      '@type': 'Question',
      name: p.question,
      acceptedAnswer: { '@type': 'Answer', text: p.answer },
    })),
  };
}
