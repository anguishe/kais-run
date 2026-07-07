'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { faqItems } from './faq-items';

export function JuliusK9HarnessPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase mb-6"
          >
            The Gear
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl tracking-tight mb-8"
          >
            THE JULIUS-K9 IDC POWERHARNESS
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
          >
            One harness rides on the truck for every dog we condition - the Julius-K9 IDC Powerharness.
            Here is what it is, why it earns that spot, and how we fit it before a single slat moves.
          </motion.p>
        </motion.div>
      </section>

      {/* Hero image */}
      <section className="px-6 pb-8 bg-brand-black">
        <motion.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-4xl mx-auto"
        >
          <img
            src="/images/equipment/kai-julius-k9-harness-full.jpg"
            alt="Kai wearing the Julius-K9 IDC Powerharness"
            width={1200}
            height={800}
            className="w-full rounded-xl border border-brand-teal/15"
          />
          <figcaption className="mt-3 text-center font-body text-xs tracking-wide text-brand-gray/80">
            Kai in the IDC Powerharness - the harness the business is built around.
          </figcaption>
        </motion.figure>
      </section>

      {/* Quick facts (AEO) */}
      <section className="py-12 px-6 bg-brand-charcoal">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl mx-auto rounded-xl border border-brand-teal/20 bg-brand-charcoal p-6 md:p-8"
        >
          <p className="font-body text-sm uppercase tracking-[0.2em] text-brand-teal mb-5">
            Quick facts
          </p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 font-body text-brand-gray leading-relaxed">
            <div>
              <dt className="text-brand-offwhite font-medium">Made by</dt>
              <dd>Julius-K9 - a Hungarian family company, established 1997</dd>
            </div>
            <div>
              <dt className="text-brand-offwhite font-medium">IDC means</dt>
              <dd>Innova Dog Comfort</dd>
            </div>
            <div>
              <dt className="text-brand-offwhite font-medium">Load path</dt>
              <dd>Across the chest and sternum - not the throat</dd>
            </div>
            <div>
              <dt className="text-brand-offwhite font-medium">Sizes</dt>
              <dd>Nine, from Baby 1 to size 4 (roughly 2 to 198 lbs)</dd>
            </div>
            <div>
              <dt className="text-brand-offwhite font-medium">On our truck</dt>
              <dd>Small, medium, and large</dd>
            </div>
            <div>
              <dt className="text-brand-offwhite font-medium">Standouts</dt>
              <dd>Spine-protecting saddle, lockable handle, reflective edges, one-click fit</dd>
            </div>
          </dl>
        </motion.div>
      </section>

      {/* Answer-first definition */}
      <section className="py-20 md:py-28 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto space-y-5 text-brand-gray font-body text-base md:text-lg leading-relaxed"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite"
          >
            What is the Julius-K9 IDC Powerharness
          </motion.h2>
          <motion.p variants={fadeUp}>
            The Julius-K9 IDC Powerharness is a chest-loading dog harness built by Julius-K9, a Hungarian
            company whose gear was adopted by police and military dog units before it ever reached pet
            owners. IDC stands for Innova Dog Comfort. The design does one thing that matters for
            conditioning above all else - it moves the force of a leash or tether off the neck and spreads
            it across the chest and sternum, so a dog can pull, lean, and drive without loading the
            throat.
          </motion.p>
          <motion.p variants={fadeUp}>
            For a business like ours, that is not a nice-to-have. Kai&apos;s Run is{' '}
            <Link href="/services/" className="text-brand-teal underline-offset-2 hover:underline">
              private, one-on-one mobile conditioning
            </Link>{' '}
            on a self-powered slatmill - the dog drives the belt with its own stride while clipped to a
            safety tether. Every session puts sustained, self-selected effort through whatever the dog is
            wearing. The harness is the interface between the dog and the work, so it gets the same
            scrutiny as the mill itself.
          </motion.p>
        </motion.div>
      </section>

      {/* Why we run it */}
      <section className="py-20 md:py-28 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto space-y-5 text-brand-gray font-body text-base md:text-lg leading-relaxed"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite"
          >
            Why we run it on every dog
          </motion.h2>
          <motion.p variants={fadeUp}>
            We standardized on the IDC because the hardware is proven under working-dog loads. Julius-K9
            describes a &ldquo;hook-and-loop adjustable length chest harness&rdquo; engineered for
            &ldquo;excellent force distribution,&rdquo; and the chest strap is built to carry the pressure
            line of the leash forward &ldquo;with almost no interruption.&rdquo; In plain terms - when a
            dog leans into the tether, the harness turns that pull into broad pressure across the chest
            instead of a point load somewhere it should not be.
          </motion.p>
          <motion.p variants={fadeUp}>
            The body of the harness is a saddle-shaped piece Julius-K9 says &ldquo;protects the
            dog&apos;s spinal cord and sensitive nerve tracts.&rdquo; That saddle also sets where the
            harness rides, which is why fit is not optional - the size of the saddle determines the
            position on the dog. Get it right and the harness disappears into the work. Get it wrong and
            it rubs, shifts, or loads the wrong structure.
          </motion.p>
          <motion.p variants={fadeUp}>
            There is a working handle across the back that Julius-K9 calls a lockable feature useful when
            you &ldquo;want to reduce the risk&rdquo; and need to &ldquo;easily stop your pet in an
            emergency.&rdquo; On the mill, that handle is a control point. It is the difference between
            managing a dog that gets excited and chasing one.
          </motion.p>
        </motion.div>
      </section>

      {/* How it's built - features */}
      <section className="py-20 md:py-28 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite mb-8"
          >
            How it is built
          </motion.h2>

          <motion.figure variants={fadeUp} className="mb-10">
            <img
              src="/images/equipment/julius-k9-idc-powerharness-three-sizes.jpg"
              alt="Three sizes of Julius-K9 IDC Powerharness"
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl border border-brand-teal/15"
            />
            <figcaption className="mt-3 text-center font-body text-xs tracking-wide text-brand-gray/80">
              The IDC in three of the nine sizes Julius-K9 makes.
            </figcaption>
          </motion.figure>

          <motion.ul
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 text-brand-gray font-body leading-relaxed"
          >
            <li>
              <span className="text-brand-offwhite font-medium">Chest-strap force distribution.</span>{' '}
              An adjustable chest strap carries the leash line forward and spreads load across the chest
              rather than the throat.
            </li>
            <li>
              <span className="text-brand-offwhite font-medium">Spine-protecting saddle.</span>{' '}
              A saddle-shaped body Julius-K9 says protects the spinal cord and sensitive nerve tracts, and
              it sets where the harness rides.
            </li>
            <li>
              <span className="text-brand-offwhite font-medium">Lockable back handle.</span>{' '}
              A handle for control and quick emergency stops - a real advantage next to a moving belt.
            </li>
            <li>
              <span className="text-brand-offwhite font-medium">One-click fit.</span>{' '}
              Julius-K9 describes a &ldquo;one-click solution&rdquo; that puts the harness on in one motion,
              so setup stays fast and low-stress.
            </li>
            <li>
              <span className="text-brand-offwhite font-medium">Reflective edges.</span>{' '}
              The chest-strap line and seams use reflective material so the dog is visible in low light.
            </li>
            <li>
              <span className="text-brand-offwhite font-medium">Nine sizes.</span>{' '}
              From Baby 1 to size 4, roughly 2 to 198 pounds - the range covers nearly any dog we would
              condition.
            </li>
            <li>
              <span className="text-brand-offwhite font-medium">Interchangeable labels.</span>{' '}
              Hook-and-loop side patches - a small thing, but it means the harness is quick to identify and
              set up per dog.
            </li>
            <li>
              <span className="text-brand-offwhite font-medium">Breathable, non-toxic material.</span>{' '}
              The IDC uses Oeko-Tex certified fabric, tested to human-clothing standards.
            </li>
          </motion.ul>

          <motion.figure variants={fadeUp} className="mt-12">
            <img
              src="/images/equipment/julius-k9-idc-power-harness-orange-detail.jpg"
              alt="Detail of the Julius-K9 IDC Powerharness chest strap and reflective edge"
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl border border-brand-teal/15"
            />
            <figcaption className="mt-3 text-center font-body text-xs tracking-wide text-brand-gray/80">
              The chest strap and reflective edge that carry the load forward, up close.
            </figcaption>
          </motion.figure>
        </motion.div>
      </section>

      {/* Sizing */}
      <section className="py-20 md:py-28 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite mb-5"
          >
            Sizing the IDC - measure the chest, not the dog
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="space-y-5 text-brand-gray font-body text-base md:text-lg leading-relaxed mb-8"
          >
            <p>
              The single most common IDC mistake is guessing the size off the dog&apos;s weight. Julius-K9
              sizes by chest circumference - measured just behind the front legs, snug but not tight - and
              weight is only a rough cross-check. The saddle size also sets where the harness rides, so an
              accurate measurement is what keeps load on the chest instead of creeping toward the throat.
            </p>
            <p>
              When two sizes overlap, we fit the dog rather than the number and adjust the chest strap from
              there. Here is the full official range so you know where your dog lands before we ever park.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="overflow-x-auto rounded-xl border border-brand-teal/15">
            <table className="w-full text-left font-body text-sm text-brand-gray">
              <thead className="bg-brand-black text-brand-offwhite">
                <tr>
                  <th className="px-4 py-3 font-medium">Size</th>
                  <th className="px-4 py-3 font-medium">Chest (in)</th>
                  <th className="px-4 py-3 font-medium">Chest (cm)</th>
                  <th className="px-4 py-3 font-medium">Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-teal/10">
                <tr><td className="px-4 py-3 text-brand-offwhite">Baby 1</td><td className="px-4 py-3">11.5 – 14</td><td className="px-4 py-3">29 – 36</td><td className="px-4 py-3">2 – 6.5 lbs</td></tr>
                <tr><td className="px-4 py-3 text-brand-offwhite">Baby 2</td><td className="px-4 py-3">13 – 17.5</td><td className="px-4 py-3">33 – 45</td><td className="px-4 py-3">4.5 – 11 lbs</td></tr>
                <tr><td className="px-4 py-3 text-brand-offwhite">Mini-Mini</td><td className="px-4 py-3">15.5 – 20.5</td><td className="px-4 py-3">40 – 53</td><td className="px-4 py-3">9 – 15.5 lbs</td></tr>
                <tr><td className="px-4 py-3 text-brand-offwhite">Mini</td><td className="px-4 py-3">20 – 26.5</td><td className="px-4 py-3">49 – 67</td><td className="px-4 py-3">15.5 – 33 lbs</td></tr>
                <tr><td className="px-4 py-3 text-brand-offwhite">0</td><td className="px-4 py-3">23 – 30</td><td className="px-4 py-3">58 – 76</td><td className="px-4 py-3">31 – 55 lbs</td></tr>
                <tr><td className="px-4 py-3 text-brand-offwhite">1</td><td className="px-4 py-3">26 – 33.5</td><td className="px-4 py-3">63 – 85</td><td className="px-4 py-3">50.5 – 66 lbs</td></tr>
                <tr><td className="px-4 py-3 text-brand-offwhite">2</td><td className="px-4 py-3">28 – 37.5</td><td className="px-4 py-3">71 – 96</td><td className="px-4 py-3">61.5 – 88 lbs</td></tr>
                <tr><td className="px-4 py-3 text-brand-offwhite">3</td><td className="px-4 py-3">32.5 – 46.5</td><td className="px-4 py-3">82 – 115</td><td className="px-4 py-3">88 – 154 lbs</td></tr>
                <tr><td className="px-4 py-3 text-brand-offwhite">4</td><td className="px-4 py-3">38 – 54.5</td><td className="px-4 py-3">96 – 138</td><td className="px-4 py-3">154 – 198 lbs</td></tr>
              </tbody>
            </table>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-4 font-body text-xs text-brand-gray/70">
            Source: Julius-K9 official IDC Powerharness size chart. The three sizes we keep on the truck cover
            the Mini through size 2 band - the majority of conditioning dogs.
          </motion.p>
        </motion.div>
      </section>

      {/* Built for working dogs first */}
      <section className="py-20 md:py-28 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto space-y-5 text-brand-gray font-body text-base md:text-lg leading-relaxed"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite"
          >
            Built for working dogs first
          </motion.h2>
          <motion.p variants={fadeUp}>
            Julius-K9 started in 1997 as a Hungarian family business founded by Gyula &ldquo;Julius&rdquo;
            Seb&#337;. By 1998 the company says its main users were &ldquo;primarily police service dog
            units, military units and canine associations.&rdquo; That order matters - the harness was
            engineered for handlers who put real load on gear every day, then reached pet owners after it
            had already earned trust in the field.
          </motion.p>
          <motion.p variants={fadeUp}>
            The scale backs it up. Julius-K9 marked its one-millionth harness sold in 2014 and says it
            protects &ldquo;almost 50 technical solutions&rdquo; across Hungarian and foreign patent
            offices. The IDC line has also collected mainstream design recognition - a Red Dot Award in
            2019, and both the German Design Award and iF Design Award in 2020.
          </motion.p>
          <motion.p variants={fadeUp}>
            Independent testers back the working-dog reputation. Dog Gear Review notes the IDC is
            &ldquo;used by Hungarian and Austrian police for a wide variety of working, sport and companion
            dogs&rdquo; - the same design a patrol handler trusts is the one that ends up on your dog in the
            driveway. That is not marketing to us; it is the reason the gear earns its keep across hundreds
            of sessions instead of wearing out in a season.
          </motion.p>
          <motion.p variants={fadeUp}>
            That heritage is the reason we do not shop the harness aisle every season. We picked the tool
            working handlers already rely on and built our fit process around it - and we keep it simple so
            the dog never has to think about the equipment, only the work.
          </motion.p>
        </motion.div>
      </section>

      {/* Buy genuine */}
      <section className="py-20 md:py-28 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto space-y-5 text-brand-gray font-body text-base md:text-lg leading-relaxed"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite"
          >
            Why we buy genuine - and why you should too
          </motion.h2>
          <motion.p variants={fadeUp}>
            That reputation cuts both ways. Julius-K9 is one of the most counterfeited names in dog gear,
            and the company is vocal about it for a reason. A knockoff can copy the orange color and the
            side-panel logo. It cannot copy the Oeko-Tex lining against the skin, the tested chest-strap
            load path, or the buckle built to the pressure Julius-K9 puts it through. On a slow leash walk
            a fake might get away with it - on working equipment, the point where it fails is the whole
            point of the gear.
          </motion.p>
          <motion.p variants={fadeUp}>
            So every harness on our truck is the real thing - bought from an authorized source, certified
            hangtags and all. If you run a Julius-K9 on your own dog, the advice is simple: buy it from
            Julius-K9 or an authorized seller, and measure the chest before you order. The safety lives in
            the details you cannot see in a listing photo, and those are exactly the details a counterfeit
            skips.
          </motion.p>
          <motion.figure variants={fadeUp} className="pt-2">
            <img
              src="/images/equipment/julius-k9-idc-power-harness-orange-angled.webp"
              alt="Three genuine Julius-K9 IDC Powerharnesses fanned out with certified hangtags and authorized-source packaging attached"
              width={1200}
              height={1600}
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl border border-brand-teal/15"
            />
            <figcaption className="mt-3 text-center font-body text-xs tracking-wide text-brand-gray/80">
              Our small, medium, and large IDC harnesses - genuine, with the certified hangtags a counterfeit cannot copy.
            </figcaption>
          </motion.figure>
        </motion.div>
      </section>

      {/* Reviews */}
      <section className="py-20 md:py-28 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite mb-4"
          >
            What independent reviewers say
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-base md:text-lg leading-relaxed mb-10"
          >
            We are not the only ones who rate it. Two independent reviews line up with what we see on the
            truck - and we include the honest caveats, because those matter more than the praise.
          </motion.p>

          <motion.blockquote
            variants={fadeUp}
            className="border-l-2 border-brand-teal pl-5 mb-8 text-brand-offwhite font-body italic leading-relaxed"
          >
            &ldquo;This harness is probably the most famous Norwegian harness and for a reason. The quality
            material makes it easy to use, easy to clean, and it is also a durable one.&rdquo;
            <span className="mt-2 block text-sm not-italic text-brand-gray">
              -{' '}
              <a
                href="https://doggearreview.com/review/idc/"
                target="_blank"
                rel="nofollow noopener"
                className="text-brand-teal underline-offset-2 hover:underline"
              >
                Dog Gear Review
              </a>
            </span>
          </motion.blockquote>

          <motion.blockquote
            variants={fadeUp}
            className="border-l-2 border-brand-teal pl-5 mb-8 text-brand-offwhite font-body italic leading-relaxed"
          >
            &ldquo;I am most impressed with the handle on the back.&rdquo; The same reviewer is candid about
            the limits - noting it &ldquo;will still not be an escape-proof harness.&rdquo;
            <span className="mt-2 block text-sm not-italic text-brand-gray">
              -{' '}
              <a
                href="https://doggearreview.com/review/idc/"
                target="_blank"
                rel="nofollow noopener"
                className="text-brand-teal underline-offset-2 hover:underline"
              >
                Dog Gear Review
              </a>
            </span>
          </motion.blockquote>

          <motion.blockquote
            variants={fadeUp}
            className="border-l-2 border-brand-teal pl-5 text-brand-offwhite font-body italic leading-relaxed"
          >
            &ldquo;The harness body is lined with a comfortable fabric, so when properly adjusted, it
            doesn&apos;t rub and cause sores &hellip; The buckles are strong enough to withstand
            pulling.&rdquo;
            <span className="mt-2 block text-sm not-italic text-brand-gray">
              -{' '}
              <a
                href="https://www.peggyfrezon.com/julius-k9-powerharness-our-product-review/"
                target="_blank"
                rel="nofollow noopener"
                className="text-brand-teal underline-offset-2 hover:underline"
              >
                Peggy Frezon, independent product review
              </a>
            </span>
          </motion.blockquote>

          <motion.blockquote
            variants={fadeUp}
            className="border-l-2 border-brand-teal pl-5 mt-8 text-brand-offwhite font-body italic leading-relaxed"
          >
            &ldquo;It was so much easier to keep Pete walking on when he really wanted to chase off after a
            squirrel &hellip; It also would be useful to help an older dog up the stairs or into a
            car.&rdquo;
            <span className="mt-2 block text-sm not-italic text-brand-gray">
              -{' '}
              <a
                href="https://www.peggyfrezon.com/julius-k9-powerharness-our-product-review/"
                target="_blank"
                rel="nofollow noopener"
                className="text-brand-teal underline-offset-2 hover:underline"
              >
                Peggy Frezon, independent product review
              </a>
            </span>
          </motion.blockquote>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-brand-gray font-body text-base md:text-lg leading-relaxed"
          >
            The escape-proof caveat is why we never rely on the harness alone. On the mill, every dog also
            clips to a safety tether - the harness distributes force and gives us the handle, and the
            tether is the backup.
          </motion.p>
        </motion.div>
      </section>

      {/* How we fit it */}
      <section className="py-20 md:py-28 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <motion.div
            variants={fadeUp}
            className="space-y-5 text-brand-gray font-body text-base md:text-lg leading-relaxed"
          >
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite">
              How we fit it on the truck
            </h2>
            <p>
              We carry small, medium, and large - the common sizes cover the large majority of dogs from
              roughly 15 to 90 pounds. If your dog sits at the edge of the range, tell us when you{' '}
              <Link href="/book/" className="text-brand-teal underline-offset-2 hover:underline">
                book the intro
              </Link>{' '}
              and we confirm fit before the first session. We are not vets - so if your dog has any
              cardiac or respiratory history, we would rather you clear conditioning with your own before
              we start.
            </p>
            <p>
              Fitting is a climbing-harness check, not a guess. No loose buckles, no twisted webbing, load
              on the chest rather than the throat. Then the harness clips to a safety tether on the mill -
              it does not pull or restrict, it just means that if a dog decides to bail sideways, nothing
              bad happens. We walk through the whole first-session sequence in{' '}
              <Link
                href="/blog/what-to-expect-first-slatmill-session/"
                className="text-brand-teal underline-offset-2 hover:underline"
              >
                what to expect from a first slatmill session
              </Link>
              .
            </p>
            <p>
              Prefer your own gear? Bring it. We assess any harness your dog already trusts against the
              same standard and only swap to our IDC if the fit will not distribute force safely for
              sustained running.
            </p>
          </motion.div>
          <motion.figure variants={fadeUp}>
            <img
              src="/images/equipment/kai-julius-k9-harness-alert.jpg"
              alt="Close fit of the Julius-K9 IDC Powerharness on an alert dog"
              width={1000}
              height={1000}
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl border border-brand-teal/15"
            />
          </motion.figure>
        </motion.div>
      </section>

      {/* First fitting reality */}
      <section className="py-20 md:py-28 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <motion.figure variants={fadeUp} className="order-last md:order-first">
            <img
              src="/images/equipment/bailey-julius-k9-harness.jpg"
              alt="Bailey, an older dog, settled and calm in her Julius-K9 IDC Powerharness"
              width={1000}
              height={1000}
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl border border-brand-teal/15"
            />
            <figcaption className="mt-3 text-center font-body text-xs tracking-wide text-brand-gray/80">
              Bailey, unbothered - the harness becomes a non-event within a session or two.
            </figcaption>
          </motion.figure>
          <motion.div
            variants={fadeUp}
            className="space-y-5 text-brand-gray font-body text-base md:text-lg leading-relaxed"
          >
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite">
              The first fitting is never the dog&apos;s favorite moment
            </h2>
            <p>
              I will be honest about how this looks the first time. New harness, new pressure across the
              chest, a dog that has never worn one - most plant their feet and give you a look. Kai, my
              Rhodesian Ridgeback mix and the reason Kai&apos;s Run exists, was thoroughly unimpressed the
              first time it went on. Bailey, our older office manager, took it in stride the way she takes
              everything.
            </p>
            <p>
              That is normal, and it is worth saying plainly so nobody feels bad watching their own dog
              sulk. A dog that fights a new harness for a minute is telling me about fit and novelty, not
              about its character. I never rush it. We put it on, we let the dog move, we watch how it
              sits - and within a session or two the harness stops registering at all and the dog just
              gets to work.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Harness vs collar */}
      <section className="py-20 md:py-28 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto space-y-5 text-brand-gray font-body text-base md:text-lg leading-relaxed"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite"
          >
            Why not a collar
          </motion.h2>
          <motion.p variants={fadeUp}>
            A flat collar is fine for an ID tag and a calm walk. It is the wrong tool for conditioning. A
            dog driving a slatmill against a tether needs load carried across the chest and sternum, not
            concentrated on the trachea and the soft tissue of the neck. Repeated pressure there is not
            something we are willing to build a fitness program on.
          </motion.p>
          <motion.p variants={fadeUp}>
            The IDC exists to solve exactly that. Broad chest distribution, a spine-protecting saddle, and
            a control handle - the harness is engineered to take the forces that structured aerobic work
            actually produces. That is the whole point of running a purpose-built harness instead of
            whatever is by the door.
          </motion.p>
        </motion.div>
      </section>

      {/* Comparison */}
      <section className="py-20 md:py-28 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto space-y-5 text-brand-gray font-body text-base md:text-lg leading-relaxed"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite"
          >
            How the IDC compares to other harness types
          </motion.h2>
          <motion.p variants={fadeUp}>
            Not every harness is built for the same job, and most owners have one that was chosen for
            walking, not conditioning. It helps to know where the IDC sits.
          </motion.p>
          <motion.p variants={fadeUp}>
            <span className="text-brand-offwhite font-medium">Front-clip no-pull harnesses</span> attach
            the leash at the chest to steer a dog off-balance when it pulls. They are a training aid, and
            they work - but that deliberate off-balance turn is the opposite of what you want under
            sustained forward effort. The IDC is a back-clip design that keeps the dog square and lets it
            drive straight ahead. Reviewers note it still &ldquo;turns the harness slightly but not as much
            as most of the other no-pull solutions&rdquo; - enough control, without fighting the gait.
          </motion.p>
          <motion.p variants={fadeUp}>
            <span className="text-brand-offwhite font-medium">Thin Y-front and vest harnesses</span> are
            comfortable for a stroll but often lack a rigid saddle, a real handle, or the webbing to carry
            repeated load. <span className="text-brand-offwhite font-medium">Flat collars</span>, as
            covered above, load the throat and have no place in conditioning at all. The IDC was engineered
            for handlers who put working loads through gear daily, which is why it carries the saddle, the
            handle, and the buckle strength that a walking harness usually skips.
          </motion.p>
          <motion.p variants={fadeUp}>
            None of this means your dog needs a new harness to train with us. It means that when we do put
            our IDC on, we know exactly why it is on there.
          </motion.p>
        </motion.div>
      </section>

      {/* Durability note */}
      <section className="py-20 md:py-28 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto space-y-5 text-brand-gray font-body text-base md:text-lg leading-relaxed"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite"
          >
            Durability and care
          </motion.h2>
          <motion.p variants={fadeUp}>
            Julius-K9 publishes a manufacturer stress test in which &ldquo;the buckle of the product opened
            at 300 kg (660 lbs.), but the harness itself did not tear.&rdquo; Read it for what it is - a
            manufacturer test, not an independent lab result, and not a rating to hang or lift a dog by.
            What it tells us is that the webbing and stitching are built well past the loads a conditioning
            session produces. Combined with reviewers calling it &ldquo;a durable one&rdquo; with buckles
            &ldquo;strong enough to withstand pulling,&rdquo; it is a harness we can run week after week
            without babying it.
          </motion.p>
          <motion.p variants={fadeUp}>
            Durable still means maintained. The IDC is easy to keep clean - the Oeko-Tex fabric wipes down,
            and the whole harness hand-washes in cool water and air-dries flat, which is all a
            saltwater-and-sand climate like ours really asks for. We check the chest strap, buckle, and
            stitching between dogs, keep the hook-and-loop free of hair so it holds, and retire any harness
            the moment webbing frays or a buckle stops seating with a clean click. On the truck the gear
            lives out of direct sun when it is not in use - UV is what actually ages webbing over years,
            not the running.
          </motion.p>
          <motion.p variants={fadeUp}>
            If you condition your own dog between visits, the same rules apply: rinse after beach days,
            store it dry and shaded, and inspect the load-bearing points before every hard session. Treated
            that way, one IDC outlasts a drawer full of walking harnesses.
          </motion.p>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite mb-8"
          >
            Harness questions, answered
          </motion.h2>
          <motion.div variants={fadeUp}>
            {/* Schema emitted once from page.tsx (FAQPage #faq) - disable the accordion's copy */}
            <FaqAccordion items={faqItems} emitSchema={false} />
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-10 text-brand-gray font-body text-base md:text-lg leading-relaxed"
          >
            More on safety, waivers, and how sessions run is on the{' '}
            <Link href="/faq/" className="text-brand-teal underline-offset-2 hover:underline">
              main FAQ
            </Link>
            , and the story behind the gear standards lives on the{' '}
            <Link href="/about/" className="text-brand-teal underline-offset-2 hover:underline">
              about page
            </Link>
            .
          </motion.p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-6xl tracking-tight mb-6"
          >
            Ready to put your dog to work
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            The harness is on the truck. So is the mill, the tether, and the plan. Start with an intro
            session and we will fit, assess, and build your dog&apos;s Run Profile in the first visit.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <Link
              href="/book/"
              className="bg-brand-teal text-white px-8 py-3 font-medium tracking-wide hover:shadow-[0_0_20px_rgba(10,92,82,0.5)] transition-all duration-300 rounded-sm"
            >
              Book an Intro Session
            </Link>
            <Link
              href="/services/"
              className="border border-brand-teal/40 text-brand-offwhite px-8 py-3 font-medium tracking-wide hover:bg-brand-teal/10 transition-colors rounded-sm"
            >
              See How Sessions Work
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Sources */}
      <section className="py-16 px-6 bg-brand-black border-t border-brand-teal/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-xl tracking-wider text-brand-offwhite mb-4">Sources</h2>
          <ul className="space-y-2 text-brand-gray font-body text-sm leading-relaxed">
            <li>
              Julius-K9 - IDC Powerharness product page and size chart:{' '}
              <a
                href="https://julius-k9.com/idc-powerharness/"
                target="_blank"
                rel="nofollow noopener"
                className="text-brand-teal underline-offset-2 hover:underline break-words"
              >
                julius-k9.com/idc-powerharness
              </a>
            </li>
            <li>
              Julius-K9 - company history, patents, and awards:{' '}
              <a
                href="https://julius-k9.com/the-company/"
                target="_blank"
                rel="nofollow noopener"
                className="text-brand-teal underline-offset-2 hover:underline break-words"
              >
                julius-k9.com/the-company
              </a>
            </li>
            <li>
              Dog Gear Review - independent IDC review:{' '}
              <a
                href="https://doggearreview.com/review/idc/"
                target="_blank"
                rel="nofollow noopener"
                className="text-brand-teal underline-offset-2 hover:underline break-words"
              >
                doggearreview.com/review/idc
              </a>
            </li>
            <li>
              Peggy Frezon - independent product review:{' '}
              <a
                href="https://www.peggyfrezon.com/julius-k9-powerharness-our-product-review/"
                target="_blank"
                rel="nofollow noopener"
                className="text-brand-teal underline-offset-2 hover:underline break-words"
              >
                peggyfrezon.com
              </a>
            </li>
          </ul>
          <p className="mt-6 text-brand-gray/70 font-body text-xs leading-relaxed">
            Kai&apos;s Run is not affiliated with or sponsored by Julius-K9. We are a customer that uses the
            harness in our conditioning work.
          </p>
        </div>
      </section>
    </>
  );
}
