import { Platform, Linking, Alert } from "react-native";
import type { EventItem } from "@/src/content/types";
import { getVenue } from "@/src/content/load";

function pad(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

/** Build floating PT local datetime as YYYYMMDDTHHMMSS for ICS (no Z). */
function icsLocal(date: string, time: string) {
  const [y, m, d] = date.split("-");
  const [hh, mm] = time.split(":");
  return `${y}${m}${d}T${hh}${mm}00`;
}

export function buildIcs(event: EventItem): string {
  const venue = getVenue(event.venueId);
  const start = event.allDay
    ? `${event.date.replace(/-/g, "")}`
    : icsLocal(event.date, event.startTime || "09:00");
  const end = event.allDay
    ? `${event.date.replace(/-/g, "")}`
    : icsLocal(event.date, event.endTime || "17:00");

  const desc = [event.summary, event.description, event.infoUrl]
    .filter(Boolean)
    .join("\\n\\n")
    .replace(/\n/g, "\\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PBCRun//Guide//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event.id}@pbcrun.com`,
    event.allDay ? `DTSTART;VALUE=DATE:${start}` : `DTSTART;TZID=America/Los_Angeles:${start}`,
    event.allDay ? `DTEND;VALUE=DATE:${end}` : `DTEND;TZID=America/Los_Angeles:${end}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `DESCRIPTION:${escapeIcs(desc)}`,
    venue ? `LOCATION:${escapeIcs(`${venue.name}, ${venue.area}`)}` : "",
    event.infoUrl ? `URL:${event.infoUrl}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  return lines.join("\r\n");
}

function escapeIcs(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export async function addEventToCalendar(event: EventItem): Promise<void> {
  const ics = buildIcs(event);

  if (Platform.OS === "web" && typeof document !== "undefined") {
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.id}.ics`;
    a.click();
    URL.revokeObjectURL(url);
    return;
  }

  // Native: open Google Calendar template as a reliable fallback without extra permissions
  const venue = getVenue(event.venueId);
  const start = event.allDay
    ? event.date.replace(/-/g, "")
    : `${event.date.replace(/-/g, "")}T${(event.startTime || "09:00").replace(":", "")}00`;
  const end = event.allDay
    ? event.date.replace(/-/g, "")
    : `${event.date.replace(/-/g, "")}T${(event.endTime || "17:00").replace(":", "")}00`;
  const gcal = new URL("https://calendar.google.com/calendar/render");
  gcal.searchParams.set("action", "TEMPLATE");
  gcal.searchParams.set("text", event.title);
  gcal.searchParams.set("dates", `${start}/${end}`);
  gcal.searchParams.set("details", `${event.summary}\n\n${event.infoUrl || ""}`);
  if (venue) gcal.searchParams.set("location", `${venue.name}, ${venue.area}`);

  const can = await Linking.canOpenURL(gcal.toString());
  if (can) {
    await Linking.openURL(gcal.toString());
  } else {
    Alert.alert("Calendar", "Could not open calendar.");
  }
}

export async function shareEvent(event: EventItem): Promise<void> {
  const venue = getVenue(event.venueId);
  const lines = [
    event.title,
    `${event.date}${event.allDay ? "" : ` · ${event.startTime}–${event.endTime} PT`}`,
    venue ? `${venue.name}, ${venue.area}` : "",
    event.summary,
    event.infoUrl || "https://pbcrun.com",
  ].filter(Boolean);
  const message = lines.join("\n");

  if (Platform.OS === "web" && typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title: event.title, text: message, url: event.infoUrl || undefined });
      return;
    } catch {
      /* user cancelled or unsupported */
    }
  }

  if (Platform.OS === "web" && typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(message);
    if (typeof window !== "undefined") {
      window.alert("Event details copied to clipboard.");
    }
    return;
  }

  // Native share via Linking mailto fallback
  const mail = `mailto:?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(message)}`;
  await Linking.openURL(mail);
}
