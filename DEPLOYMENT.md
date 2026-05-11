# Deploying Kai's Run to GitHub Pages

## Initial Deployment

1. Create GitHub repo named 'kais-run' at github.com
2. In terminal: `git init`, `git add .`, `git commit -m "Initial build"`
3. `git remote add origin https://github.com/YOUR_USERNAME/kais-run.git`
4. `git push -u origin main`
5. On GitHub: Settings → Pages → Source: GitHub Actions
6. Wait ~2 min, site live at `https://YOUR_USERNAME.github.io/kais-run`

## Updating Spots Counter

Open `components/ui/SpotsCounter.tsx`  
Change `SPOTS_REMAINING = 20` to current number

```bash
git add . && git commit -m "Update spots: X remaining" && git push
```

Site auto-rebuilds in ~2 min.

## Adding Real Photos

Drop photos into `public/images/` (see filenames in README)  
Push to GitHub — site rebuilds automatically.

## Connecting Custom Domain (when ready)

1. Buy domain at Namecheap (kaisrun.com recommended)
2. In `next.config.js`: remove `basePath` entirely
3. GitHub: Settings → Pages → Custom Domain → enter domain
4. Namecheap DNS: add CNAME record → YOUR_USERNAME.github.io
5. Enable "Enforce HTTPS" in GitHub Pages settings
