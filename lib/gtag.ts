export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
export const event = (action: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, params);
  }
};
