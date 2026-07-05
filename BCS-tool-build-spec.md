# BCS TOOL — BUILD SPEC + COPY (verbatim source for the Claude Code deck)

New free tool. Mirror the existing `too-hot-to-walk` pattern exactly:
`app/tools/dog-body-condition-score/page.tsx` (server: metadata, WebApplication + FAQPage
schema, static content, FAQ inline, internal links) + `BodyConditionChecker.tsx`
(`'use client'`: all interactive logic). Support `?embed=1` like the other tools.

Design decision (locked): this is a **hands-on body check**, not a scale/breed-weight
calculator. No weight input, no breed weight tables, no calorie or gram numbers anywhere.
The output routes all diet specifics to the vet and bridges the movement side to conditioning.
This is deliberate: it matches the tool's promise ("no scale"), it is what the overweight blog
post argues, and it keeps us clear of medical/diet prescriptions.

---

## ROUTE / METADATA

- Route: `/tools/dog-body-condition-score/`
- `<title>`: Is My Dog Overweight? The 30-Second Body Check (No Scale) | Kai's Run
- meta description: Skip the scale. Answer three questions about your dog's ribs, waist, and profile to estimate its body condition score - the same hands-on check vets use. Built for Emerald Coast owners.
- canonical: https://kaisrun.xyz/tools/dog-body-condition-score/  (apex — match the stack)
- og:title / og:description: reuse title + description
- og:image: /images/og-image.png (default, same as other tools)

---

## H1 + INTRO (server-rendered, above the widget)

**H1:** Is My Dog Overweight? The 30-Second Body Check

**Intro:** The scale lies. A number on it means nothing without knowing what a healthy weight
is for your specific dog, and that varies so much between two dogs of the same breed that the
number alone tells you almost nothing. Vets do not go by weight - they go by feel. It is called
a body condition score, and it comes down to three things you can check with your own hands in
under a minute: the ribs, the waist, and the profile. Answer honestly below and this tool
estimates where your dog lands on the 9-point scale vets use, plus what to do about it. It does
not replace your vet, and it will never hand you a diet - it tells you what your hands are
telling you, and what the next move is.

---

## THE WIDGET — question flow

Three required questions, one optional modifier block, then a Calculate button. Each question
is a set of tappable option cards (match the chip/card styling of the existing tools). Reveal a
one-line "how to check" helper under each question heading.

### Q1 — RIBS  (helper: "Rest both hands flat on your dog's sides, over the ribcage. Do not press hard - use the pressure you'd use to feel the bones on the back of your own hand.")
- A. I can see the ribs, or feel them with almost no covering over them
- B. I can feel each rib easily with a light touch, with a thin layer over them
- C. I have to press to feel the ribs - there's a noticeable layer of padding
- D. I can't feel the ribs, or only by pressing in firmly

### Q2 — WAIST  (helper: "Stand over your dog and look straight down at its back, behind the ribcage.")
- A. Sharp hourglass - the hips and ribs jut out
- B. A clear waist - the body narrows noticeably behind the ribs
- C. The waist is hard to make out - the back looks broad and straight
- D. No waist at all - the back is as wide as, or wider than, the ribs

### Q3 — PROFILE  (helper: "Look at your dog from the side, at its level. Watch the belly line behind the ribcage.")
- A. Extreme tuck - the belly and flank are very drawn up
- B. The belly tucks up behind the ribcage
- C. The belly line runs roughly level - little to no tuck
- D. The belly hangs down or sags below the ribcage

### Q4 — BREED / COAT CONTEXT (optional, multi-select, changes the interpretation note, not the raw score much)
- Deep-chested or sighthound-type build (Greyhound, Whippet, Rhodesian Ridgeback, Vizsla)
- Stocky or barrel-chested build (Labrador, Bulldog, Pug, Beagle)
- Very thick or double coat (Husky, Shepherd, Chow, Golden)

---

## SCORING LOGIC (deterministic — implement exactly)

Map each answer to a value on the 9-point BCS scale:

| Answer | Value |
|---|---|
| A (Q1/Q2/Q3) | 2 |
| B | 5 |
| C | 6.5 |
| D | 8.5 |

The rib check is the most reliable single indicator, so weight Q1 double:

```
bcs = (2 * Q1val + Q2val + Q3val) / 4     // rounded to nearest 0.5, clamped 1–9
```

Band from `bcs`:
- bcs <= 3.5  → UNDERWEIGHT (1–3)
- 4 <= bcs <= 5.5 → IDEAL (4–5)
- 6 <= bcs <= 6.5 → SLIGHTLY OVER (6)
- bcs == 7 (i.e. 6.75–7.25) → OVERWEIGHT (7)
- bcs >= 7.5 → OBESE (8–9)

Display the estimated number as "roughly a BCS of X / 9" plus the band label. Always frame it
as an estimate, never a diagnosis.

### Modifier interpretation notes (append to the result; do NOT silently change the band)
- **Deep-chested / sighthound selected AND band = UNDERWEIGHT:** append — "One caveat: on a
  deep-chested or sighthound build, visible ribs and a deep tuck can be completely normal. If
  your hands told you the ribs have a thin layer over them and your dog has energy and muscle,
  it may be at a healthy weight for its build. Your vet is the tiebreaker."
- **Stocky / barrel-chested selected AND band = SLIGHTLY OVER or OVERWEIGHT:** append — "Note:
  stocky, barrel-chested breeds naturally carry less of a tuck and a broader outline, so the
  waist and profile checks read heavier than they are. Weight the rib check most - if the ribs
  are easy to feel, your dog may be closer to ideal than the outline suggests."
- **Thick / double coat selected (any band):** append — "Because your dog has a heavy coat, the
  waist and profile you see are less reliable than what your hands feel. Trust the rib check
  above the visual ones, and re-check with the coat wet or pressed flat if you're unsure."

---

## RESULT COPY (per band) — verdict + plan. Route diet to the vet every time.

### UNDERWEIGHT (1–3)
**Verdict:** Your dog is reading underweight. You can see or easily feel the ribs with little
covering, and the tuck and waist are pronounced.
**Plan:** A dog that is too thin is a vet conversation before anything else - sudden or
unexplained weight loss can point to a medical issue, and that has to be ruled out first. Do
not add hard exercise to a dog that is underweight, and do not try to "build it up" with more
food on your own. See your vet, get the cause identified, and let them set the plan. Once your
dog is cleared and back to a healthy condition, steady, controlled conditioning is how you build
real muscle rather than just fat - but that comes after the vet, not before.

### IDEAL (4–5)
**Verdict:** Your dog is in ideal condition. You can feel the ribs with a light touch, there is
a clear waist from above, and the belly tucks up from the side. This is exactly where you want
to be.
**Plan:** The job now is holding it here, and the thing that keeps a dog at a healthy condition
is not a diet - it is a consistent daily outlet. A dog that moves every day holds its weight and
its muscle far more easily than one that gets exercised in bursts. The trap is coasting: skip
the movement for a few weeks and condition slips before the scale ever shows it. Keep a real
routine, and re-run this check monthly. If you want to make sure your dog is getting the right
amount of work for its drive and age, [the exercise calculator](/tools/dog-exercise-calculator/)
gives you a starting range.

### SLIGHTLY OVER (6)
**Verdict:** Your dog is carrying a little extra. The ribs take some pressure to feel, the waist
is softening, and the tuck is shallow. This is the easiest stage to turn around - and the one
most owners miss, because a slightly heavy dog still looks fine.
**Plan:** Catching it here is the win. The fix has two halves, and only one of them is exercise.
The food side - how much, and what - is a conversation for your vet, who can set real targets for
your specific dog. I will not put a number on that; it is a medical call. The movement side is
where a consistent outlet does the work: steady daily conditioning builds the muscle that burns
more even at rest and keeps the extra from becoming a real problem. Do not crash-diet or
over-exercise your way there. Read [why the scale is the wrong number to watch](/blog/is-my-dog-overweight/)
for the full picture, and dial in the right workload with [the exercise calculator](/tools/dog-exercise-calculator/).

### OVERWEIGHT (7)
**Verdict:** Your dog is overweight. The ribs are hard to feel under a clear layer, the waist is
mostly gone from above, and there is little to no tuck from the side.
**Plan:** This is worth taking seriously, but it is fixable, and it is not your fault - carrying
weight creeps up slowly and looks normal until you check with your hands. Two things move the
needle. The food side belongs to your vet - they set the calorie target and rule out anything
medical, and I will not guess at numbers that a professional should own. The movement side is a
steady, controlled outlet: an overweight dog needs consistent low-to-moderate work, not a
sudden hard push that its joints and heart are not ready for. That balance - real movement
without overloading a body carrying extra weight - is exactly what a structured, self-paced
session is built for. Before you ramp anything, read [how to read the exercise limit](/blog/can-you-over-exercise-a-dog/),
because an overweight dog is the one you most need to avoid pushing too hard too fast.

### OBESE (8–9)
**Verdict:** Your dog is reading obese. The ribs are buried, there is no waist and no tuck, and
there may be fat over the spine and at the base of the tail. This is a health issue, not a
cosmetic one.
**Plan:** This one goes to your vet first, and soon - carrying this much extra weight strains the
joints, the heart, and the metabolism, and it takes real years off a dog's life. Your vet sets
the plan: the diet, the pace, and clearance for activity. Do not start hard exercise on an obese
dog on your own - a body carrying this much load can be hurt by the wrong kind of push. Once your
vet has cleared movement, the right start is gentle, steady, low-impact work that builds
tolerance without pounding the joints, increased slowly over weeks. A self-paced outlet where the
dog controls the effort fits that brief well, but only after the vet signs off. For older dogs
especially, [keeping an aging body moving the right way](/blog/senior-dog-exercise/) matters even
more here.

---

## CLOSING CTA (server-rendered, below the widget)

The check tells you where your dog stands. The movement side of the fix is what we do. Kai's Run
brings a self-powered slatmill to your driveway for private, one-on-one conditioning - the dog
sets the pace, so an out-of-shape dog is never forced past what its body can handle, and it is
climate-controlled against the Florida heat. When you are ready to build the movement half of a
weight plan, [book an intro session](/book/) or see [what a session includes](/services/). For
the diet half, talk to your vet - that part is theirs. We serve Destin, Fort Walton Beach,
Niceville, and the rest of the Emerald Coast.

---

## FAQ (feeds FAQPage schema — 5 items)

**How can I tell if my dog is overweight without a scale?** Use your hands, the way a vet does.
Feel for the ribs (you should feel them easily with a light touch), look for a waist from above,
and check whether the belly tucks up from the side. Those three checks - the body condition
score - tell you more than any number on a scale, because a healthy weight varies enormously
between two dogs of the same breed.

**What is a body condition score?** It is the standard 9-point scale vets use to judge whether a
dog is at a healthy weight, based on feel and shape rather than pounds. A 4 to 5 out of 9 is
ideal, below that is underweight, and above it is overweight to obese. It is the same assessment
this tool walks you through.

**My dog looks fine but my vet says it's overweight - who's right?** Usually the vet. A slightly
heavy dog looks completely normal to the eye, which is exactly why weight creeps up unnoticed -
the hands-on check catches it well before the mirror does. If the ribs take real pressure to
feel, believe the hands.

**Can I just exercise the weight off my dog?** Not by exercise alone, and not fast. Weight comes
off through a calorie deficit your vet sets, with consistent movement supporting it - and an
overweight or obese dog has to build activity gradually so its joints and heart are not
overloaded. Movement is half the plan; the food side belongs to your vet.

**Is it bad if I can see my dog's ribs?** It depends on the build. On a deep-chested or
sighthound-type dog, a faint rib outline and a deep tuck can be perfectly normal. On most other
breeds, clearly visible ribs with no covering lean toward underweight. Feel matters more than
sight - if the ribs have a thin layer over them and your dog has energy and muscle, it is likely
fine. Your vet is the tiebreaker.

---

## INTERNAL LINKS used on this page (all real, relative, trailing slash)
/blog/is-my-dog-overweight/ · /tools/dog-exercise-calculator/ · /blog/how-much-exercise-does-my-dog-need/
· /blog/can-you-over-exercise-a-dog/ · /blog/senior-dog-exercise/ · /book/ · /services/

## SCHEMA (mirror too-hot-to-walk)
- WebApplication: name "Dog Body Condition Score Checker", applicationCategory
  "HealthApplication", isAccessibleForFree true, provider @id https://kaisrun.xyz/#business,
  url https://kaisrun.xyz/tools/dog-body-condition-score/
- FAQPage: mainEntity = the 5 FAQ Q/A pairs above, verbatim

## TOOLS INDEX CARD (add to the hardcoded array in app/tools/page.tsx)
{ href: '/tools/dog-body-condition-score/', title: 'Is My Dog Overweight?',
  blurb: 'Skip the scale. A 30-second hands-on body check that estimates your dog\'s condition
  score - and tells you the next move.' }
