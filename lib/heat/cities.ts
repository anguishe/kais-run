// Service-area cities with centroid coordinates (fine for weather lookups).

export type City = {
  city: string;
  zip: string;
  lat: number;
  lon: number;
};

export const CITIES: City[] = [
  { city: "Destin", zip: "32541", lat: 30.3935, lon: -86.4958 },
  { city: "Fort Walton Beach", zip: "32547", lat: 30.4058, lon: -86.6188 },
  { city: "Niceville", zip: "32578", lat: 30.5163, lon: -86.4822 },
  { city: "Miramar Beach", zip: "32550", lat: 30.3785, lon: -86.3536 },
  { city: "Sandestin", zip: "32550", lat: 30.3838, lon: -86.3300 },
  { city: "Shalimar", zip: "32579", lat: 30.4427, lon: -86.5800 },
  { city: "Mary Esther", zip: "32569", lat: 30.4127, lon: -86.6627 },
  { city: "Navarre", zip: "32566", lat: 30.4019, lon: -86.8625 },
  { city: "Santa Rosa Beach", zip: "32459", lat: 30.3658, lon: -86.2330 },
  { city: "Bluewater Bay", zip: "32578", lat: 30.4938, lon: -86.4730 },
  { city: "Valparaiso", zip: "32580", lat: 30.4938, lon: -86.4994 },
];

// Two cities share 32550 (Miramar Beach / Sandestin) and 32578 (Niceville /
// Bluewater Bay) — findByZip returns the first match, which is good enough for
// a weather lookup since the coords are within a couple miles.
export function findByZip(zip: string): City | null {
  const z = zip.trim();
  return CITIES.find((c) => c.zip === z) ?? null;
}

export function findByCity(name: string): City | null {
  const n = name.trim().toLowerCase();
  return CITIES.find((c) => c.city.toLowerCase() === n) ?? null;
}
