export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
export const event = (action: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
};
