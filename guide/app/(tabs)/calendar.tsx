import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { EventCard } from "@/components/EventCard";
import { colors, spacing } from "@/constants/Theme";
import { eventsOnDate, formatDayLabel, getContent, toPTDateKey } from "@/src/content/load";
import type { EventItem } from "@/src/content/types";
import { usePlan } from "@/src/state/PlanContext";

type Filter = "all" | "free" | "ticketed" | "must" | "saved";

export default function CalendarScreen() {
  const content = getContent();
  const days = content.days;
  const todayKey = toPTDateKey(new Date());
  const defaultDay = days.includes(todayKey) ? todayKey : days[0] ?? "2026-08-07";
  const [day, setDay] = useState(defaultDay);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const { saved } = usePlan();

  const events = useMemo(() => {
    let list: EventItem[] = eventsOnDate(day);
    if (filter === "free") list = list.filter((e) => e.access === "free");
    if (filter === "ticketed") list = list.filter((e) => e.access === "ticketed");
    if (filter === "must") list = list.filter((e) => e.tags?.includes("must-see"));
    if (filter === "saved") list = list.filter((e) => saved.includes(e.id));
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.summary.toLowerCase().includes(q) ||
          e.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [day, filter, query, saved]);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "free", label: "Free" },
    { id: "ticketed", label: "Ticketed" },
    { id: "must", label: "Must-see" },
    { id: "saved", label: "My plan" },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.search}
          placeholder="Search events…"
          placeholderTextColor={colors.muted}
          value={query}
          onChangeText={setQuery}
          accessibilityLabel="Search events"
        />
      </View>

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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      >
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <Pressable
              key={f.id}
              onPress={() => setFilter(f.id)}
              style={[styles.filterChip, active && styles.filterChipActive]}
            >
              <Text style={[styles.filterText, active && styles.filterTextActive]}>{f.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.list}>
        <Text style={styles.heading}>{formatDayLabel(day)}</Text>
        <Text style={styles.sub}>
          {events.length} event{events.length === 1 ? "" : "s"} · times in PT
        </Text>
        {events.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
        {!events.length ? <Text style={styles.empty}>No events match this filter.</Text> : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  searchWrap: { paddingHorizontal: spacing.sm, paddingTop: spacing.sm },
  search: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.ink,
    minHeight: 44,
  },
  dayScroll: { maxHeight: 56, borderBottomWidth: 1, borderBottomColor: colors.line, marginTop: 8 },
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
  filters: { paddingHorizontal: spacing.sm, paddingVertical: spacing.sm, gap: 8 },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.chip,
    borderWidth: 1,
    borderColor: colors.line,
    marginRight: 8,
  },
  filterChipActive: { backgroundColor: colors.ink, borderColor: colors.ink },
  filterText: { fontSize: 13, fontWeight: "600", color: colors.muted },
  filterTextActive: { color: "#fff" },
  list: { padding: spacing.md, paddingBottom: spacing.xl },
  heading: { fontSize: 20, fontWeight: "700", color: colors.ink },
  sub: { fontSize: 12, color: colors.muted, marginBottom: spacing.sm },
  empty: { color: colors.muted, marginTop: spacing.md },
});
