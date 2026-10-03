import Button from '@/components/ui/Button';

/*
 * Server component on purpose - this is the homepage LCP block.
 * No framer-motion here: the old initial="hidden" animate="visible" kept the
 * H1 at opacity 0 until the JS bundle hydrated (mobile LCP 6.5s). The entrance
 * is now the CSS-only .kr-rise (transform only, never hidden, reduced-motion
 * safe), so the hero paints with the server HTML. Below-fold sections keep
 * their framer whileInView reveals.
 */
export function Hero() {
  return (
    <section className="grain-overlay relative min-h-screen flex items-end bg-brand-black overflow-hidden">
      {/* Cinematic radial gradient — always visible as fallback */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, #1A1F2E 0%, #0F1117 70%)',
        }}
      />

      {/* Background hero image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/hero-main.webp"
          alt="Tan short-coated dog standing in profile inside a dark cargo van"
          width={1264}
          height={848}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
      </div>

      <div className="kr-rise relative z-10 w-full max-w-6xl mx-auto px-6 pb-20 md:pb-32">
        {/* Teal accent rule */}
        <div className="w-16 h-px bg-brand-teal mb-6" />

        <p className="text-brand-teal-light font-body text-xs tracking-[0.3em] uppercase mb-8">
          Destin · Fort Walton Beach · Niceville
        </p>

        <h1 className="font-display text-7xl md:text-[120px] lg:text-[160px] tracking-tight leading-[0.85] mb-8 text-brand-offwhite">
          YOUR DOG
          <br />
          <span className="text-brand-teal-light">DESERVES</span>
          <br />
          TO RUN.
        </h1>

        <p className="entity-statement">
          Kai&apos;s Run is Destin&apos;s only mobile dog slatmill service - we bring a
          self-powered conditioning treadmill to your driveway in Destin, Fort Walton
          Beach, and Niceville FL.
        </p>

        <p className="text-base md:text-lg font-body text-brand-gray max-w-xl mb-12 leading-relaxed">
          Structured canine conditioning. Delivered to your driveway.{' '}
          Not a dog walk. A performance session.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/book/" variant="primary" className="text-base px-10 py-4">
            Join the Launch List
          </Button>
          <Button href="/tools/" variant="secondary" className="text-base px-10 py-4">
            Try the Free Dog Tools
          </Button>
        </div>
      </div>
    </section>
  );
}
