import { NextResponse } from "next/server";
import { findByZip } from "@/lib/heat/cities";
import type { HourSample } from "@/lib/heat/verdict";

type Weather = {
  tempF: number;
  humidity: number;
  feelsLikeF: number;
  hourly: HourSample[];
};

// Format epoch seconds shifted by a UTC offset into local wall time
// "YYYY-MM-DDTHH:MM" so OpenWeatherMap hours line up with Open-Meteo's
// local timestamps. tzOffsetSeconds comes from OWM's city.timezone field.
function toLocalISO(epochSeconds: number, tzOffsetSeconds: number): string {
  const d = new Date((epochSeconds + tzOffsetSeconds) * 1000);
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())}` +
    `T${p(d.getUTCHours())}:${p(d.getUTCMinutes())}`
  );
}

async function fromOpenMeteo(lat: number, lon: number): Promise<Weather> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature` +
    `&hourly=temperature_2m,relative_humidity_2m` +
    `&temperature_unit=fahrenheit&timezone=auto&forecast_days=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`open-meteo ${res.status}`);
  const d = await res.json();
  const times: string[] = d.hourly?.time ?? [];
  const temps: number[] = d.hourly?.temperature_2m ?? [];
  const hums: number[] = d.hourly?.relative_humidity_2m ?? [];
  return {
    tempF: d.current.temperature_2m,
    humidity: d.current.relative_humidity_2m,
    feelsLikeF: d.current.apparent_temperature,
    hourly: times.map((t, i) => ({
      hourISO: t,
      tempF: temps[i],
      humidity: hums[i],
    })),
  };
}

async function fromOpenWeather(
  lat: number,
  lon: number,
  key: string,
): Promise<Weather> {
  const base = "https://api.openweathermap.org/data/2.5";
  const [curRes, fcRes] = await Promise.all([
    fetch(`${base}/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`),
    fetch(`${base}/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`),
  ]);
  if (!curRes.ok) throw new Error(`owm current ${curRes.status}`);
  if (!fcRes.ok) throw new Error(`owm forecast ${fcRes.status}`);
  const cur = await curRes.json();
  const fc = await fcRes.json();
  // ponytail: OWM forecast is 3-hour steps; first day only keeps it comparable
  // to Open-Meteo's 24 single hours. Good enough for the safe-window heuristic.
  const list = ((fc.list ?? []) as { dt: number; main: { temp: number; humidity: number; feels_like: number } }[]).slice(0, 8);
  // OWM forecast returns the location's UTC offset in city.timezone (seconds).
  const tzOffset: number = typeof fc.city?.timezone === "number" ? fc.city.timezone : 0;
  return {
    tempF: cur.main.temp,
    humidity: cur.main.humidity,
    feelsLikeF: cur.main.feels_like,
    hourly: list.map((h) => ({
      hourISO: toLocalISO(h.dt, tzOffset),
      tempF: h.main.temp,
      humidity: h.main.humidity,
    })),
  };
}

// Resolve any US ZIP to coordinates via OWM's free geocoding API. Returns the
// place name too so the frontend can label a result outside the service area.
async function geocodeZip(
  zip: string,
  key: string,
): Promise<{ lat: number; lon: number; name: string } | null> {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${key}`,
  );
  if (!res.ok) return null;
  const d = await res.json();
  if (typeof d.lat !== "number" || typeof d.lon !== "number") return null;
  return { lat: d.lat, lon: d.lon, name: d.name ?? zip };
}

async function getWeather(lat: number, lon: number): Promise<Weather> {
  const key = process.env.OPENWEATHER_API_KEY;
  if (key) {
    try { return await fromOpenWeather(lat, lon, key); } catch {}
  }
  return fromOpenMeteo(lat, lon);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const zip = searchParams.get("zip");
  const latParam = searchParams.get("lat");
  const lonParam = searchParams.get("lon");

  let lat: number | null = null;
  let lon: number | null = null;
  let city: string | null = null;

  if (zip) {
    const known = findByZip(zip);
    if (known) {
      lat = known.lat;
      lon = known.lon;
      city = known.city;
    } else {
      // Unknown ZIP: geocode it so the tool works anywhere, not just the
      // service area. Needs the OWM key; without it, arbitrary ZIPs fail below.
      const key = process.env.OPENWEATHER_API_KEY;
      if (key && /^\d{5}$/.test(zip)) {
        const geo = await geocodeZip(zip, key);
        if (geo) {
          lat = geo.lat;
          lon = geo.lon;
          city = geo.name;
        }
      }
    }
  }
  if (lat === null && latParam && lonParam) {
    lat = Number(latParam);
    lon = Number(lonParam);
  }

  if (lat === null || lon === null || Number.isNaN(lat) || Number.isNaN(lon)) {
    return NextResponse.json({ error: "out-of-area" }, { status: 404 });
  }

  try {
    const weather = await getWeather(lat, lon);
    return NextResponse.json(
      city ? { ...weather, city } : weather,
      {
        headers: { "Cache-Control": "public, max-age=600" },
      },
    );
  } catch {
    return NextResponse.json({ error: "weather-unavailable" }, { status: 502 });
  }
}
