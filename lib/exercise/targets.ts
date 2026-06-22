export type DriveTier = "low" | "moderate" | "high" | "working";

export interface BreedEntry {
  name: string;
  tier: DriveTier;
}

// ~40 breeds across all tiers
export const BREEDS: BreedEntry[] = [
  // low drive
  { name: "Basset Hound", tier: "low" },
  { name: "Bulldog", tier: "low" },
  { name: "Cavalier King Charles Spaniel", tier: "low" },
  { name: "Chow Chow", tier: "low" },
  { name: "French Bulldog", tier: "low" },
  { name: "Great Dane", tier: "low" },
  { name: "Maltese", tier: "low" },
  { name: "Pug", tier: "low" },
  { name: "Shih Tzu", tier: "low" },
  // moderate drive
  { name: "Beagle", tier: "moderate" },
  { name: "Bernese Mountain Dog", tier: "moderate" },
  { name: "Boxer", tier: "moderate" },
  { name: "Cocker Spaniel", tier: "moderate" },
  { name: "Dalmatian", tier: "moderate" },
  { name: "Golden Retriever", tier: "moderate" },
  { name: "Havanese", tier: "moderate" },
  { name: "Labrador Retriever", tier: "moderate" },
  { name: "Poodle (Standard)", tier: "moderate" },
  { name: "Poodle (Miniature)", tier: "moderate" },
  { name: "Soft Coated Wheaten Terrier", tier: "moderate" },
  // high drive
  { name: "Alaskan Malamute", tier: "high" },
  { name: "Australian Shepherd", tier: "high" },
  { name: "Doberman Pinscher", tier: "high" },
  { name: "English Springer Spaniel", tier: "high" },
  { name: "Jack Russell Terrier", tier: "high" },
  { name: "Rhodesian Ridgeback", tier: "high" },
  { name: "Siberian Husky", tier: "high" },
  { name: "Staffordshire Bull Terrier", tier: "high" },
  { name: "Vizsla", tier: "high" },
  { name: "Weimaraner", tier: "high" },
  // working drive
  { name: "Belgian Malinois", tier: "working" },
  { name: "Border Collie", tier: "working" },
  { name: "Dutch Shepherd", tier: "working" },
  { name: "German Shepherd", tier: "working" },
  { name: "Groenendael (Belgian Shepherd)", tier: "working" },
  { name: "Tervuren (Belgian Shepherd)", tier: "working" },
  // manual selector sentinel
  { name: "Mixed / Other", tier: "moderate" }, // triggers manual tier selector in UI
];

// Adult baseline daily exercise minutes [min, max] by drive tier
export const ADULT_BASELINE_MIN: Record<DriveTier, [number, number]> = {
  low: [20, 30],
  moderate: [30, 60],
  high: [60, 120],
  working: [120, 150],
};

// Life-stage age thresholds in months
export const LIFE_STAGE_THRESHOLDS = {
  PUPPY_MAX_MONTHS: 12,         // <12 = puppy
  ADOLESCENT_MIN_MONTHS: 12,    // 12-18 = adolescent (high-energy window 6-18 in UI copy)
  ADOLESCENT_MAX_MONTHS: 18,    // >18 = adult until...
  SENIOR_MIN_MONTHS: 84,        // >=84 (7 years) = senior
} as const;

export type LifeStage = "puppy" | "adolescent" | "adult" | "senior";

export function getLifeStage(ageMonths: number): LifeStage {
  if (ageMonths < LIFE_STAGE_THRESHOLDS.PUPPY_MAX_MONTHS) return "puppy";
  if (ageMonths < LIFE_STAGE_THRESHOLDS.ADOLESCENT_MAX_MONTHS) return "adolescent";
  if (ageMonths < LIFE_STAGE_THRESHOLDS.SENIOR_MIN_MONTHS) return "adult";
  return "senior";
}

export function getTierForBreed(breedName: string): DriveTier | null {
  const entry = BREEDS.find(
    (b) => b.name.toLowerCase() === breedName.toLowerCase()
  );
  return entry ? entry.tier : null;
}
