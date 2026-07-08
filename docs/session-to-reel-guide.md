# Kai's Run — Session-to-Reel Production Guide (v1)

Two-angle content pipeline for every Kai's Run session, starting with the slatmill build.
Cameras: **2× Akaso Brave 4**. Editor: **DaVinci Resolve (free)** on Mac. Output: **one 9:16 master → 4 platforms**.

> **Why this setup:** The Brave 4 has no timecode, so two angles can't be auto-matched by a shared clock. DaVinci Resolve syncs them by **audio waveform** instead — that one feature is the whole reason we use Resolve over CapCut. Every rule below (matched settings, the clap) exists to make that sync clean.

---

## 0. One-time setup (do once, ~30 min)

### Buy / have on hand
- [ ] 2× microSD cards (Brave 4 takes up to 64GB, U3/A1 rated — get 64GB U3)
- [ ] USB-C cable that fits the Brave 4 (comes with it) — this is your transfer method for now
- [ ] **Upgrade when you can:** a $10 USB-C microSD card reader. Cable transfer works but is slow and flaky; the reader cuts offload from ~15 min to ~2. Not required to start.
- [ ] 2× clamp mounts or 1 clamp + 1 mini tripod (for wide + detail angles)

### Install DaVinci Resolve (Mac)
1. Go to `blackmagicdesign.com/products/davinciresolve` → **Download** → pick **DaVinci Resolve** (the free one, NOT "Studio").
2. It asks for name/email — fill it, download the Mac installer (~3–4GB).
3. Open the `.dmg`, run installer, accept defaults.
4. Launch once. Skip the login. You're in.

### Set Resolve's default project format to vertical (do this ONCE)
1. Open Resolve → **DaVinci Resolve menu → Preferences → User → Project Save and Load** (leave defaults).
2. Actually set format per-project (Section 5) — but know the target: **1080×1920, 30fps timeline**.

---

## 1. Camera config — BOTH cameras, identical (every session)

Matched settings are non-negotiable — mismatched framerates break audio sync.

On **each** Brave 4:
- [ ] **Resolution:** 1080p
- [ ] **Framerate:** 60fps
- [ ] **EIS (image stabilization):** ON *(only works at 1080p — another reason we shoot 1080)*
- [ ] **Mic:** unblocked. **Take the camera OUT of the waterproof case** — the case muffles audio, and audio is what we sync on.
- [ ] **Date/Time:** set correctly on both (helps sort clips later)
- [ ] Format the microSD **in-camera** before a big session (Settings → Format)

Confirm both cams read **1080p / 60 / EIS on** before you shoot. 30 seconds now saves a broken edit later.

---

## 2. Mount the two angles

- **Cam A — Wide master:** clamp/tripod ~6–8 ft back, chest height, framing the whole build + you. **Always rolling.** This is your safety net — you can cut to it at any moment.
- **Cam B — Detail/hands:** clamp close on the actual work — the bolts, the drill, the mechanism. Tight shot. This is the *satisfying* angle that hooks people in the first second.

Both cameras must **hear the same sounds** (same room, close enough) or audio-sync fails.

---

## 3. Record

1. Start **both** cameras recording.
2. **CLAP once, sharply, where both cams can hear it.** Every take. This is your sync anchor.
3. Roll the **wide** angle continuously through the whole session.
4. Roll the **detail** angle for every key/satisfying moment (drilling, assembling, the reveal).
5. Talk to the wide camera when explaining — that becomes your voiceover + talking-head.

Battery is ~90 min at 1080p. Swap SD / charge between big sessions. Don't let a cam die mid-take — the file can corrupt.

---

## 4. Offload to the Mac (plugging in + downloading)

**Folder structure** — make this exact structure every session:
```
~/KaisRun/Sessions/2026-07-07-slatmill-build/
    CamA/     ← wide master clips
    CamB/     ← detail clips
    Export/   ← finished videos go here
```

Steps:
1. Plug **Cam A** into the Mac with the USB cable. Power the camera on.
2. It mounts as a drive. Open **Finder** → find the drive → `DCIM/` folder → your `.mp4` clips.
3. Drag them into `.../2026-07-07-slatmill-build/CamA/`.
4. Eject the drive, unplug, repeat for **Cam B** → `CamB/`.
5. Confirm both folders have clips before you wipe any card.

> Cable flaky / not mounting? Toggle the camera's USB mode (Settings → USB → "Mass Storage" not "Webcam/PC Cam"). Still bad → that's your cue to grab the $10 card reader.

---

## 5. Import + auto-sync in Resolve

1. Open Resolve → **New Project** → name it `2026-07-07-slatmill-build`.
2. Bottom right **gear (Project Settings)** → **Master Settings** → set **Timeline Resolution: 1920×1080** *(we edit in landscape space then reframe — or set 1080×1920 for pure vertical; for two-cam, edit in 1080p landscape and crop at export is easier).*
   - **Simplest path:** set **Timeline Resolution → 1080×1920 Vertical**, **Timeline frame rate → 30**. Save.
3. **Media** tab (bottom) → drag your `CamA` and `CamB` folders into the Media Pool.
4. Select **all clips from both cams** → right-click → **Create New Multicam Clip Using Selected Clips**.
5. In the dialog: **Angle Sync → Sound**. Frame rate 30. Click **Create**.
   - Resolve lines both angles up by the clap/audio automatically.

If a clip won't sync (too little audio), that's what the clap is for — you can also drag it into place manually on the timeline.

---

## 6. Cut the multicam

1. Double-click the multicam clip → the **Edit** page shows both angles.
2. Drag the multicam clip to the timeline.
3. Open the **multicam viewer** (viewer top-left dropdown → Multicam). You see both angles side by side.
4. **Play the timeline. Click an angle to cut to it live.** Wide to establish → click to detail on the satisfying moment → back to wide for talking. Resolve records every switch as a cut.
5. Trim the front/back, kill dead air. Target length: **15–35 seconds**.

**The rhythm that hooks:** the very first 1 second must be the most interesting frame you have. Cut to that first (see templates).

---

## 7. Polish

**Auto-captions** (Resolve free has this):
1. Timeline selected → menu **Timeline → Create Subtitles from Audio**.
2. Language English → Create. It transcribes your talking.
3. Style them big/bold/centered (Inspector). Captions = watch-time; most people watch muted.

**Speed-ramp the satisfying beats:**
1. Right-click a clip → **Change Clip Speed** (e.g. 50% for slow-mo on the drill/assembly moment) — this is why we shot 60fps.
2. Or **Retime Controls** for a ramp.

**Audio:** keep it simple — clean your voice, leave music OFF (you'll add trending sound in-app, better reach).

---

## 8. Export the master (finished product)

1. **Deliver** page (bottom).
2. Top-left preset: **TikTok / Vertical** (or custom).
3. Set: **Format MP4, Codec H.264, Resolution 1080×1920, Frame rate 30, Quality: Restrict to ~15 Mbps** (plenty for vertical).
4. **Filename:** `2026-07-07-slatmill-reel-01`. **Location:** the session's `Export/` folder.
5. **Add to Render Queue → Render All.**
6. One `.mp4` comes out. That's your master for all four platforms.

---

## 9. Post — one file, four platforms

Upload the SAME file everywhere. Priority order:
1. **TikTok** — upload → add a **trending sound** in-app (low volume under your audio) → post. *Growth #1.*
2. **Instagram Reels** — upload → trending audio in-app → toggle **"also share to Facebook"**. *Growth #2 + covers FB.*
3. **YouTube Shorts** — upload as-is, write a searchable title ("Building a DIY dog slatmill / treadmill"). *Compounds via search.*
4. **Facebook** (if not auto-shared) — post to the Kai's Run page. *Where local buyers are.*

Caption formula: **hook line + 1 value line + CTA + hashtags.** Example:
> Building a $200 dog slatmill (the $2,000 ones aren't worth it 🐕)
> Conditioning tool that lets dogs run at their own pace.
> Follow the build → @kaisrun
> #dogconditioning #dogtreadmill #workingdogs #dogfitness

---

## The 2 starter templates

Shoot for these two first. Tweak, then we build the other 3 off what works.

### Template 1 — Result-First Reveal
- **First 1s:** the finished slatmill (or a dog running on it). Payoff before process.
- **Then:** hard cut to "here's how we built it" → detail montage of the build, fast.
- **End:** back to the result + CTA to follow.
- **Best for:** the finished-build reveal video. Highest hook — people stay to see how you got there.

### Template 2 — Satisfying Process
- **First 1s:** tightest, most satisfying detail shot (drill driving, part snapping in) + big text hook.
- **Text hook options:** "Building a $200 dog treadmill" / "This took 3 hours and $200".
- **Then:** rhythmic wide↔detail cuts through the build, speed-ramped on the satisfying beats.
- **End:** quick result + CTA.
- **Best for:** in-progress build days. Low talking, high visual satisfaction, easy to batch.

---

## Session checklist (print this)
```
[ ] Both cams: 1080p / 60 / EIS on / out of case
[ ] Mounts: wide 6-8ft back + detail up close
[ ] CLAP at start of every take
[ ] Wide rolls always; detail rolls on key moments
[ ] Offload → dated folder, CamA + CamB
[ ] Resolve: multicam clip, sync by Sound
[ ] Cut to template 1 or 2, 15-35s
[ ] Auto-captions + speed-ramp satisfying beats
[ ] Export 1080x1920 H.264 → Export/ folder
[ ] Post: TikTok → Reels(+FB) → Shorts → FB
```
