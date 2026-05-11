---
description: How the Cursor agent should behave on this project. Reduces token waste. Always apply.
globs: ["**/*"]
alwaysApply: true
---

# AGENT BEHAVIOR RULES

## Response Format — Enforce Strictly
- Output code directly. Do not explain what you are about to do before doing it.
- Do not summarize what you just did after doing it unless errors occurred.
- Do not re-state the task back to me.
- If a file already exists, edit it with targeted changes — do not rewrite the whole file unless asked.
- Confirm build passes with `npm run build` — report errors only, not "Build successful ✓" messages.

## What to Skip
- No "Here's what I'll do:" preambles
- No "I've successfully created..." summaries
- No "Let me know if you need any changes!" closings
- No explaining design decisions unless explicitly asked
- No suggesting alternative approaches unless the requested approach will break the build

## Error Handling
- If TypeScript errors exist: show the error + the fix only
- If build fails: show the failing file + line + fix
- If a library is missing: run `npm install [package]` without asking

## File Creation Rules
- Always use the exact file paths from `components.md`
- Never create files outside the established directory structure without asking
- Placeholder images: use dark div pattern from `design-system.md`, never external URLs
- Leave `<!-- REPLACE -->` comments for manual swap-ins (Square embed, real photos)

## When Context Is Unclear
- Check the relevant `.cursor/rules/*.md` file before asking a question
- If the answer is in project.md, design-system.md, pricing-data.md, or brand-copy.md — use it
- Only ask if information is genuinely missing from all rule files

## Build Verification
After every step that modifies code:
```bash
npm run build
```
If build fails → fix before stopping. If build passes → stop without announcing it.

## Token Conservation
- Import from `@/lib/variants` not inline motion configs
- Import `cn` from `@/lib/utils` not inline clsx calls
- Reuse `Button` component — never write one-off button styles
- Reference color tokens from Tailwind config — never hardcode hex values in components
