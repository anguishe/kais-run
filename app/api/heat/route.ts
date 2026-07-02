import { NextResponse } from "next/server";
import { findByZip } from "@/lib/heat/cities";
import type { HourSample } from "@/lib/heat/verdict";

type Weather = {
  tempF: number;
  humidity: number;
  feelsLikeF: number;
  hourly: HourSample[];
};

// Format epoch seconds as America/Chicago wall time "YYYY-MM-DDTHH:MM"
// so OpenWeatherMap hours line up with Open-Meteo's local timestamps.
function toChicagoISO(epochSeconds: number): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(epochSeconds * 1000));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  let hour = get("hour");
  if (hour === "24") hour = "00";
  return `${get("year")}-${get("month")}-${get("day")}T${hour}:${get("minute")}`;
}

async function fromOpenMeteo(lat: number, lon: number): Promise<Weather> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature` +
    `&hourly=temperature_2m,relative_humidity_2m` +
    `&temperature_unit=fahrenheit&timezone=America/Chicago&forecast_days=1`;
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
  return {
    tempF: cur.main.temp,
    humidity: cur.main.humidity,
    feelsLikeF: cur.main.feels_like,
    hourly: list.map((h) => ({
      hourISO: toChicagoISO(h.dt),
      tempF: h.main.temp,
      humidity: h.main.humidity,
    })),
  };
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

  if (zip) {
    const city = findByZip(zip);
    if (city) {
      lat = city.lat;
      lon = city.lon;
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
    return NextResponse.json(weather, {
      headers: { "Cache-Control": "public, max-age=600" },
    });
  } catch {
    return NextResponse.json({ error: "weather-unavailable" }, { status: 502 });
  }
}
