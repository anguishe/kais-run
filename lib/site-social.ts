/**
 * Single source of truth for Kai's Run live social profiles.
 *
 * Consumed by the schema sameAs array (app/layout.tsx) and the footer social
 * icons (components/layout/Footer.tsx) so the two can never drift. Adding a new
 * live platform here is a one-line change (add its icon to Footer's SOCIAL_ICONS).
 *
 * Note: facebook.com / youtube.com / instagram.com / tiktok.com correctly use
 * `www` — that is the platform's own domain, NOT the kaisrun.xyz apex/www rule.
 */
export const SOCIAL_PROFILES = [
  { name: 'Facebook', url: 'https://www.facebook.com/kaisrun' },
  { name: 'YouTube', url: 'https://www.youtube.com/@kaisrunfl' },
  { name: 'Instagram', url: 'https://www.instagram.com/kaisrun' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@kaisrun' },
] as const;
