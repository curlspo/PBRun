import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "@/constants/Theme";
import { accessLabel, getVenue } from "@/src/content/load";
import type { EventItem } from "@/src/content/types";
import { usePlan } from "@/src/state/PlanContext";

type Props = {
  event: EventItem;
  compact?: boolean;
};

export function EventCard({ event, compact }: Props) {
  const venue = getVenue(event.venueId);
  const { isSaved, toggleSaved, ready } = usePlan();
  const saved = isSaved(event.id);
  const badge = accessLabel(event.access);
  const badgeColor =
    event.access === "free" ? colors.free : event.access === "ticketed" ? colors.ticketed : colors.mixed;
  const mustSee = event.tags?.includes("must-see");

  return (
    <View style={styles.wrap}>
      <Link href={`/event/${event.id}`} asChild>
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel={`${event.title}, ${badge}`}
        >
          <View style={styles.row}>
            <Text style={[styles.badge, { color: badgeColor, borderColor: badgeColor }]}>{badge}</Text>
            {mustSee ? <Text style={styles.must}>MUST-SEE</Text> : null}
            {!event.allDay ? (
              <Text style={styles.time}>
                {event.startTime}
                {event.endTime ? `–${event.endTime}` : ""} PT
              </Text>
            ) : (
              <Text style={styles.time}>All day · PT</Text>
            )}
          </View>
          <Text style={styles.title}>{event.title}</Text>
          {!compact && (
            <Text style={styles.summary} numberOfLines={2}>
              {event.summary}
            </Text>
          )}
          {venue ? (
            <Text style={styles.meta}>
              {venue.name} · {venue.area}
            </Text>
          ) : null}
        </Pressable>
      </Link>
      <Pressable
        style={styles.saveBtn}
        onPress={() => toggleSaved(event.id)}
        disabled={!ready}
        accessibilityRole="button"
        accessibilityLabel={saved ? "Remove from plan" : "Save to plan"}
        hitSlop={8}
      >
        <Text style={[styles.saveIcon, saved && styles.saveIconOn]}>{saved ? "★" : "☆"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: "relative", marginBottom: spacing.sm },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 10,
    padding: spacing.md,
    paddingRight: 44,
  },
  pressed: { opacity: 0.85 },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: 6, flexWrap: "wrap" },
  badge: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    overflow: "hidden",
  },
  must: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
    color: colors.gold,
  },
  time: { fontSize: 12, color: colors.muted, fontWeight: "600" },
  title: { fontSize: 17, fontWeight: "600", color: colors.ink, marginBottom: 4 },
  summary: { fontSize: 14, color: colors.muted, lineHeight: 20, marginBottom: 6 },
  meta: { fontSize: 12, color: colors.gold, fontWeight: "600" },
  saveBtn: {
    position: "absolute",
    right: 8,
    top: 10,
    minWidth: 36,
    minHeight: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  saveIcon: { fontSize: 22, color: colors.muted },
  saveIconOn: { color: colors.gold },
});
