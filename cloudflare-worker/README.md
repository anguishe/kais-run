# Kai's Run — Cloudflare Worker Setup

## Deploy Steps

1. Go to workers.cloudflare.com — create free account
2. Create new Worker — name it `kaisrun-subscribe`
3. Paste the contents of `subscribe-worker.js` into the editor
4. Under Settings → Variables → add Environment Variable:
   - Name: MAILCHIMP_API_KEY
   - Value: YOUR_MAILCHIMP_API_KEY_HERE
   - Mark as Secret
5. Deploy
6. Copy the Worker URL (format: kaisrun-subscribe.YOUR-SUBDOMAIN.workers.dev)
7. Paste that URL into NEXT_PUBLIC_WORKER_URL in step below

## Update Site Config

After deploying the Worker, update the site to point at the Worker URL
instead of /api/subscribe/ — see Task 3 in the Cursor prompt.
