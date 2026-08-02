import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { EventCard } from "@/components/EventCard";
import { colors, spacing } from "@/constants/Theme";
import { eventsOnDate, formatDayLabel, getContent } from "@/src/content/load";
import type { EventItem } from "@/src/content/types";

type Filter = "all" | "free" | "ticketed";

export default function CalendarScreen() {
  const content = getContent();
  const days = content.days;
  const [day, setDay] = useState(days[0] ?? "2026-08-07");
  const [filter, setFilter] = useState<Filter>("all");

  const events = useMemo(() => {
    let list: EventItem[] = eventsOnDate(day);
    if (filter === "free") list = list.filter((e) => e.access === "free");
    if (filter === "ticketed") list = list.filter((e) => e.access === "ticketed");
    return list;
  }, [day, filter]);

  return (
    <View style={styles.screen}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dayScroll}
        contentContainerStyle={styles.dayRow}
      >
        {days.map((d) => {
          const active = d === day;
          return (
            <Pressable
              key={d}
              onPress={() => setDay(d)}
              style={[styles.dayChip, active && styles.dayChipActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Text style={[styles.dayChipText, active && styles.dayChipTextActive]}>
                {formatDayLabel(d)}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.filters}>
        {(["all", "free", "ticketed"] as Filter[]).map((f) => {
          const active = filter === f;
          return (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              style={[styles.filterChip, active && styles.filterChipActive]}
            >
              <Text style={[styles.filterText, active && styles.filterTextActive]}>
                {f === "all" ? "All" : f === "free" ? "Free" : "Ticketed"}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        <Text style={styles.heading}>{formatDayLabel(day)}</Text>
        <Text style={styles.sub}>{events.length} events · times in PT</Text>
        {events.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
        {!events.length ? <Text style={styles.empty}>No events for this filter.</Text> : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  dayScroll: { maxHeight: 56, borderBottomWidth: 1, borderBottomColor: colors.line },
  dayRow: { paddingHorizontal: spacing.sm, paddingVertical: spacing.sm, gap: 8, alignItems: "center" },
  dayChip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.card,
    marginRight: 8,
  },
  dayChipActive: { backgroundColor: colors.gold, borderColor: colors.gold },
  dayChipText: { fontSize: 13, fontWeight: "600", color: colors.ink },
  dayChipTextActive: { color: "#fff" },
  filters: { flexDirection: "row", gap: 8, padding: spacing.sm, paddingBottom: 0 },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.chip,
    borderWidth: 1,
    borderColor: colors.line,
  },
  filterChipActive: { backgroundColor: colors.ink, borderColor: colors.ink },
  filterText: { fontSize: 13, fontWeight: "600", color: colors.muted },
  filterTextActive: { color: "#fff" },
  list: { padding: spacing.md, paddingBottom: spacing.xl },
  heading: { fontSize: 20, fontWeight: "700", color: colors.ink },
  sub: { fontSize: 12, color: colors.muted, marginBottom: spacing.sm },
  empty: { color: colors.muted, marginTop: spacing.md },
});
