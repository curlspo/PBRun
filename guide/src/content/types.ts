export type Access = "free" | "ticketed" | "mixed";

export type Venue = {
  id: string;
  name: string;
  area: string;
  lat: number;
  lng: number;
  notes?: string;
};

export type EventItem = {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  allDay: boolean;
  access: Access;
  venueId: string | null;
  summary: string;
  description: string;
  whatToLookFor?: string[];
  infoUrl: string;
  ticketUrl?: string | null;
  tier: "A" | "B" | "C";
  tags: string[];
  lastVerifiedAt: string;
};

export type CarItem = {
  id: string;
  showId: string;
  showName: string;
  year: number;
  make: string;
  model: string;
  className: string;
  owner?: string | null;
  coachwork?: string | null;
  description?: string;
  featured?: boolean;
};

export type ContentBundle = {
  contentVersion: string;
  season: string;
  timezone: string;
  days: string[];
  venues: Venue[];
  events: EventItem[];
  cars: CarItem[];
};
