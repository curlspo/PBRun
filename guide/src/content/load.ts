import raw from "../../content/content.json";
import type { CarItem, ContentBundle, EventItem, Venue } from "./types";

const bundle = raw as ContentBundle;

export function getContent(): ContentBundle {
  return bundle;
}

export function getVenue(id: string | null | undefined): Venue | undefined {
  if (!id) return undefined;
  return bundle.venues.find((v) => v.id === id);
}

export function getEvent(id: string): EventItem | undefined {
  return bundle.events.find((e) => e.id === id);
}

export function getCar(id: string): CarItem | undefined {
  return bundle.cars.find((c) => c.id === id);
}

export function eventsOnDate(date: string): EventItem[] {
  return bundle.events
    .filter((e) => e.date === date)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function eventsForToday(now = new Date()): EventItem[] {
  const date = toPTDateKey(now);
  const today = eventsOnDate(date);
  if (today.length) return today;
  // If outside Car Week, show next upcoming day with events
  const upcoming = bundle.events
    .filter((e) => e.date >= date)
    .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));
  if (!upcoming.length) return [];
  const d = upcoming[0].date;
  return eventsOnDate(d);
}

export function nextEvent(now = new Date()): EventItem | undefined {
  const date = toPTDateKey(now);
  const time = toPTTimeKey(now);
  const sorted = [...bundle.events].sort(
    (a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime)
  );
  return sorted.find((e) => e.date > date || (e.date === date && e.endTime >= time));
}

export function featuredCars(): CarItem[] {
  return bundle.cars.filter((c) => c.featured);
}

/** YYYY-MM-DD in America/Los_Angeles */
export function toPTDateKey(d: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

export function toPTTimeKey(d: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const hh = parts.find((p) => p.type === "hour")?.value ?? "00";
  const mm = parts.find((p) => p.type === "minute")?.value ?? "00";
  return `${hh}:${mm}`;
}

export function formatDayLabel(dateKey: string): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  const utc = new Date(Date.UTC(y, m - 1, d, 17, 0, 0)); // midday PT-ish
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(utc);
}

export function accessLabel(access: EventItem["access"]): string {
  if (access === "free") return "FREE";
  if (access === "ticketed") return "TICKETED";
  return "MIXED";
}

export function mapsUrl(venue: Venue): string {
  return `https://maps.apple.com/?ll=${venue.lat},${venue.lng}&q=${encodeURIComponent(venue.name)}`;
}
