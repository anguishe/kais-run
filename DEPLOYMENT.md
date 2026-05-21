# Deploying Kai's Run to GitHub Pages

## Initial Deployment

1. Create GitHub repo named 'kais-run' at github.com
2. In terminal: `git init`, `git add .`, `git commit -m "Initial build"`
3. `git remote add origin https://github.com/YOUR_USERNAME/kais-run.git`
4. `git push -u origin main`
5. On GitHub: Settings → Pages → Source: GitHub Actions
6. Wait ~2 min, site live at `https://YOUR_USERNAME.github.io/kais-run`

## Updating Founding Athlete Spots

When a spot sells:

1. Open `public/data/config.json`
2. Decrease `remaining` by 1
3. Update `lastUpdated` to today's date
4. Save and push:

```bash
git add public/data/config.json && git commit -m "Spots: [N] remaining" && git push
```

Site rebuilds in ~2 minutes.

## Adding Real Photos

Drop photos into `public/images/` (see filenames in README)  
Push to GitHub — site rebuilds automatically.

## Connecting Custom Domain (when ready)

Production domain: **kaisrun.xyz** (`public/CNAME` must list `kaisrun.xyz`).

1. In `next.config.js`: remove `basePath` entirely (if it was set for the GitHub Pages subpath).
2. GitHub: Settings → Pages → Custom domain → enter `kaisrun.xyz`.
3. At your DNS registrar: add a **CNAME** for `@` or `www` as required by GitHub Pages (often `www` → `YOUR_USERNAME.github.io`; apex may use A/ALIAS per GitHub docs).
4. Enable **Enforce HTTPS** in GitHub Pages settings after DNS validates.
