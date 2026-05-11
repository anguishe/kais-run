const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
} as const;

export const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
} as const;

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } },
} as const;
