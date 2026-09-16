# Publishing - Fall 2026 Field Notes

Five posts are written, committed, and scheduled. They publish themselves - URL, blog index and sitemap - with no deploy.

## How scheduling works

The `date` field in a post's frontmatter is the publish gate. A post dated in the
future is deployed like any other file but stays out of `/blog/`, out of related
posts, and 404s on its own URL until that day arrives. `/blog/` and
`/blog/[slug]/` carry `export const revalidate = 3600`, so the switch flips within
an hour of midnight Central. No deploy, no cron, nothing to run.

To preview a scheduled post before its date, run `npm run dev` and open its URL.
Scheduled and draft posts both render in development.

Run `npm run check:schedule` any time to see the calendar, catch a slug missing
from `CATEGORY_MAP`, and get the paste-ready llms.txt line for anything
that has gone live but is not listed yet.

## The schedule

| Date | Slug | Why that date |
|---|---|---|
| 2026-09-03 | `dog-lost-fitness-over-summer` | First tolerable mornings of the season - owners restart walks and the dog gasses out |
| 2026-09-22 | `red-tide-dogs-emerald-coast` | Okaloosa blooms hit in Sept 2018 and Sept 2021; this is the window |
| 2026-10-08 | `mental-stimulation-vs-exercise-dog` | Evergreen, fills the biggest gap in the library |
| 2026-10-22 | `dog-halloween-door-safety` | Nine days before Halloween, Saturday Oct 31 |
| 2026-10-29 | `dog-walk-dark-after-time-change` | Three days before the clocks fall back on Nov 1 |

## On each publish day

The post, `/blog/` and `/sitemap.xml` all flip on their own within the hour
(`app/sitemap.ts` reads the same date gate; verified 2026-09-16 by running the
production build with the clock moved past 9/22). What is left is distribution:

1. Post to Facebook, then drop the URL in the first comment within about a minute
2. Optional, any time that week: `npm run check:schedule` prints the `llms.txt` line to paste, then IndexNow + GSC URL inspection on the new URL

---

# Facebook posts

Link discipline: the URL never goes in the post body, because Facebook suppresses
reach on posts carrying external links. It goes in the first comment, posted
within roughly a minute of the post going live.

---

## 1. Sept 3 - Summer deconditioning

First tolerable morning of the year, so I grabbed the leash like everybody else on this coast.

Kai lasted ten minutes.

Not sick. Not old. Out of shape - and there is research putting a number on exactly how out of shape a dog gets over a summer like the one we just had. It is worse than you would guess, and the way most owners respond in September is the part that actually hurts the dog.

Full breakdown - link in the first comment.

- Kai. My human is describing a walk where I stopped twice as a scientific finding. I was pacing myself. There is a difference.

#Destin #EmeraldCoast #DogsOfDestin

**First comment:** https://kaisrun.xyz/blog/dog-lost-fitness-over-summer/

---

## 2. Sept 22 - Red tide

Everyone worries about the water. The water is not the part that gets your dog.

Red tide has reached Okaloosa beaches in September more than once, and the highest-risk thing on that sand is a dead fish your dog has already decided is the best find of its life. Second highest is your own back seat, twenty minutes later.

If you walk a dog anywhere near the Gulf this month, know the exposure routes before the bloom shows up, not after.

Link in the first comment.

- Kai. I have been told the fish on the beach are not for me. I disagree, and I have been overruled.

#Destin #EmeraldCoast #FortWaltonBeach

**First comment:** https://kaisrun.xyz/blog/red-tide-dogs-emerald-coast/

---

## 3. Oct 8 - Mental stimulation

"We did a puzzle feeder and he was out cold for two hours. Does he still need the run?"

Yes. And the reason is more interesting than the answer.

There is a real study showing what sniffing does to a dog's outlook - it is a better result than most people who repeat the advice realize. There is also no version of it that builds a heart, a tendon, or a set of lungs. The internet collapsed those two things into one claim, and high-drive dogs are the ones paying for it.

Link in the first comment.

- Kai. I solved the puzzle box in under a minute and my human called me a genius. Then I stared at him until he got the harness. One of those was the point.

#Destin #EmeraldCoast #DogsOfDestin

**First comment:** https://kaisrun.xyz/blog/mental-stimulation-vs-exercise-dog/

---

## 4. Oct 22 - Halloween

Halloween is on a Saturday this year, which means your front door opens onto strangers roughly forty times in four hours.

That is the hazard. Not the chocolate, not the costume.

And it is worse than an escape risk. If you have spent months teaching your dog not to lose its mind at the door, Halloween night is forty reps of the exact behavior you have been undoing, all of them rewarded.

There is a plan, and most of it happens before dark.

Link in the first comment.

- Kai. Forty strangers came to the door dressed as things that do not exist, and I was placed in a bedroom with a fan. I have filed a complaint.

#Destin #EmeraldCoast #DogsOfDestin

**First comment:** https://kaisrun.xyz/blog/dog-halloween-door-safety/

---

## 5. Oct 29 - Dark by five

Saturday the sun sets in Destin at 5:59. Monday it sets at 4:58.

We spent four months giving up the middle of the day to the heat. We got about six good weeks of evenings. Now the clock takes those too, on the earliest possible date it can fall.

There is also a reason the first two weeks of November are the worst of the whole year to be walking a dog after work, and it is not what most people assume.

Link in the first comment.

- Kai. The sun now goes down while I am still waiting for dinner, which I consider a serious administrative failure.

#Destin #EmeraldCoast #Niceville

**First comment:** https://kaisrun.xyz/blog/dog-walk-dark-after-time-change/
