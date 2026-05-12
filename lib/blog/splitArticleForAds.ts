/**
 * Splits article MDX/markdown into blocks separated by blank lines, then classifies
 * which blocks are “prose paragraphs” for ad injection heuristics.
 *
 * Heuristic: headings, fenced code, blockquotes, HTML/MDX tags, tables, import/export
 * lines are not counted as prose paragraphs.
 */

export type ArticleSegment = {
  /** MDX source slice for this block (compile separately). */
  source: string;
  /** Whether this block is treated as a body paragraph for ad placement math. */
  isProseParagraph: boolean;
};

const IMPORT_EXPORT = /^(?:import|export)\s/m;

function isProseParagraphBlock(block: string): boolean {
  const t = block.trim();
  if (!t) return false;
  if (IMPORT_EXPORT.test(t)) return false;
  if (/^(#{1,6})\s/m.test(t)) return false;
  if (/^```/.test(t)) return false;
  if (/^>/m.test(t)) return false;
  if (/^<[A-Za-z!/]/.test(t)) return false;
  if (/^\|.+\|/m.test(t)) return false;
  if (/^---\s*$/m.test(t)) return false;
  if (/^[-*+] \S/m.test(t) && !t.includes('\n')) return false;
  if (/^\d+\. \S/m.test(t) && !t.includes('\n')) return false;
  return true;
}

/**
 * Counts prose paragraphs (same classification as {@link splitArticleBody}).
 */
export function countProseParagraphs(body: string): number {
  return splitArticleBody(body).proseParagraphCount;
}

/**
 * After which 0-based prose index the mid-article ad should appear (inclusive of that paragraph),
 * or `null` when the mid slot should be omitted (short posts / collision with top placement).
 *
 * Mid is inserted after paragraph index `Math.floor(total / 2) - 1` in 0-based terms,
 * only when `Math.floor(total / 2) > 2` so it does not duplicate the “after 2 paragraphs” break.
 */
export function getMidArticleProseIndexAfter(totalProseParagraphs: number): number | null {
  const midOneBased = Math.floor(totalProseParagraphs / 2);
  if (midOneBased <= 2) return null;
  return midOneBased - 1;
}

/**
 * Paragraph-index plan for in-article ads: top after the 2nd prose block, mid after the
 * `Math.floor(n/2)`-th paragraph when that position is past the top slot (desktop mid only in UI).
 */
export function getBlogAdInsertionPlan(totalProseParagraphs: number): {
  topTriggerProseIndex: number;
  midTriggerProseIndex: number | null;
} {
  return {
    topTriggerProseIndex: 1,
    midTriggerProseIndex: getMidArticleProseIndexAfter(totalProseParagraphs),
  };
}

export function splitArticleBody(body: string): {
  segments: ArticleSegment[];
  proseParagraphCount: number;
} {
  const normalized = body.replace(/\r\n/g, '\n').trim();
  const rawBlocks = normalized.split(/\n\n+/);
  const segments: ArticleSegment[] = rawBlocks
    .map((b) => b.trim())
    .filter(Boolean)
    .map((source) => ({
      source,
      isProseParagraph: isProseParagraphBlock(source),
    }));

  const proseParagraphCount = segments.filter((s) => s.isProseParagraph).length;
  return { segments, proseParagraphCount };
}
