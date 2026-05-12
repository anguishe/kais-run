import type { ComponentProps } from 'react';
import { MDXProvider } from '@mdx-js/react';
import Link from 'next/link';

const linkClass = 'text-brand-teal underline-offset-4 hover:text-brand-offwhite hover:underline';

type MdxProvidedComponents = NonNullable<ComponentProps<typeof MDXProvider>['components']>;

export const blogMdxComponents: MdxProvidedComponents = {
  h2: (props) => (
    <h2
      className="font-display text-4xl md:text-5xl tracking-tight text-brand-offwhite mt-14 mb-4 first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="font-display text-2xl md:text-3xl tracking-wide text-brand-offwhite mt-10 mb-3" {...props} />
  ),
  h4: (props) => (
    <h4 className="font-body text-lg font-semibold text-brand-offwhite mt-8 mb-2" {...props} />
  ),
  p: (props) => (
    <p className="font-body text-lg leading-relaxed text-brand-gray mb-6 last:mb-0" {...props} />
  ),
  ul: (props) => <ul className="mb-6 list-disc space-y-2 pl-6 font-body text-brand-gray text-lg" {...props} />,
  ol: (props) => <ol className="mb-6 list-decimal space-y-2 pl-6 font-body text-brand-gray text-lg" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: ({ href, children, className, ...rest }) => {
    const mergedClass = [linkClass, className].filter(Boolean).join(' ');
    if (href?.startsWith('/')) {
      return <Link href={href} className={mergedClass}>{children}</Link>;
    }
    return (
      <a href={href} className={mergedClass} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  },
  strong: (props) => <strong className="font-semibold text-brand-offwhite" {...props} />,
  em: (props) => <em className="italic text-brand-offwhite/90" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-8 border-l-2 border-brand-gold/60 pl-6 font-body text-brand-gray italic"
      {...props}
    />
  ),
  code: (props) => (
    <code className="rounded bg-brand-black/80 px-1.5 py-0.5 font-mono text-sm text-brand-gold" {...props} />
  ),
  pre: (props) => (
    <pre className="mb-8 overflow-x-auto rounded-lg border border-brand-teal/20 bg-brand-black p-4 text-sm" {...props} />
  ),
  hr: () => <hr className="my-12 border-brand-teal/20" />,
};
