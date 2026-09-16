const SITE = 'https://kaisrun.xyz';

/**
 * Embeds only earn a link when the credit sits on the HOST page, outside the iframe -
 * a link inside the frame counts for the framed page, not for the site embedding it.
 */
export const EMBED_CHROME_CSS =
  'body>nav,body>footer,body>[role="dialog"],[data-cookie-banner]{display:none!important}';

export function EmbedCredit({ path }: { path: string }) {
  return (
    <p className="mt-6 font-body text-sm text-brand-gray text-center">
      Powered by{' '}
      <a href={`${SITE}${path}`} target="_blank" rel="noopener" className="text-brand-teal-light underline">
        Kai&apos;s Run
      </a>
    </p>
  );
}

type Props = { path: string; iframeTitle: string; credit: string; height: number };

export default function EmbedThisTool({ path, iframeTitle, credit, height }: Props) {
  // ponytail: <pre> with select-all instead of a copy button - one click selects, no client JS.
  const snippet =
    `<iframe src="${SITE}${path}?embed=1" width="100%" height="${height}" style="border:0" loading="lazy" title="${iframeTitle}"></iframe>\n` +
    `<p>${credit} by <a href="${SITE}${path}">Kai's Run</a></p>`;
  return (
    <section className="mt-16">
      <h2 className="font-display text-3xl text-brand-offwhite">Embed this tool on your site</h2>
      <p className="mt-3 font-body text-brand-gray leading-relaxed">
        Vets, groomers, rescues and trainers are welcome to put this tool on their own site for free.
        Paste the code below where it should appear - it stays current as the tool improves. Adjust
        the height if your page needs more room.
      </p>
      <pre className="mt-4 select-all whitespace-pre-wrap break-all rounded-lg bg-brand-charcoal p-4 font-mono text-xs text-brand-offwhite">
        {snippet}
      </pre>
      <p className="mt-2 font-body text-xs text-brand-gray">Click the box once to select all of it, then copy.</p>
    </section>
  );
}
