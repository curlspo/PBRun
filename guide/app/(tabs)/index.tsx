import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { EventCard } from "@/components/EventCard";
import { colors, spacing } from "@/constants/Theme";
import {
  eventsForToday,
  featuredCars,
  formatDayLabel,
  getContent,
  getEvent,
  nextEvent,
} from "@/src/content/load";
import { usePlan } from "@/src/state/PlanContext";

export default function HomeScreen() {
  const content = getContent();
  const todayEvents = eventsForToday();
  const next = nextEvent();
  const featured = featuredCars()[0];
  const dayLabel = todayEvents[0] ? formatDayLabel(todayEvents[0].date) : "Car Week 2026";
  const { saved, ready } = usePlan();

  const planEvents = saved
    .map((id) => getEvent(id))
    .filter(Boolean)
    .sort((a, b) => a!.date.localeCompare(b!.date) || a!.startTime.localeCompare(b!.startTime))
    .slice(0, 6);

  const mustSeeToday = todayEvents.filter((e) => e.tags?.includes("must-see"));

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.brand}>PBCRun</Text>
      <Text style={styles.eyebrow}>Independent guide to Monterey Car Week</Text>

      {next ? (
        <View style={styles.panel}>
          <Text style={styles.panelLabel}>Up next</Text>
          <Text style={styles.panelTitle}>{next.title}</Text>
          <Text style={styles.panelMeta}>
            {formatDayLabel(next.date)} · {next.allDay ? "All day" : next.startTime} PT
          </Text>
          <Link href={`/event/${next.id}`} style={styles.link}>
            View details →
          </Link>
        </View>
      ) : null}

      {ready && planEvents.length > 0 ? (
        <View style={styles.sectionBlock}>
          <Text style={styles.section}>My plan</Text>
          <Text style={styles.sectionSub}>{saved.length} saved · tap ★ on any event</Text>
          {planEvents.map((e) => (e ? <EventCard key={e.id} event={e} compact /> : null))}
          <Link href="/calendar" style={styles.link}>
            Open calendar →
          </Link>
        </View>
      ) : null}

      {featured ? (
        <View style={styles.panel}>
          <Text style={styles.panelLabel}>Featured car</Text>
          <Text style={styles.panelTitle}>
            {featured.year} {featured.make} {featured.model}
          </Text>
          <Text style={styles.panelMeta}>{featured.showName}</Text>
          <Link href={`/car/${featured.id}`} style={styles.link}>
            Open in directory →
          </Link>
        </View>
      ) : null}

      {mustSeeToday.length > 0 ? (
        <View style={styles.sectionBlock}>
          <Text style={styles.section}>Must-see today</Text>
          <Text style={styles.sectionSub}>{formatDayLabel(mustSeeToday[0].date)}</Text>
          {mustSeeToday.map((e) => (
            <EventCard key={e.id} event={e} compact />
          ))}
        </View>
      ) : null}

      <Text style={styles.section}>{dayLabel}</Text>
      <Text style={styles.sectionSub}>
        {todayEvents.length} events · content {content.contentVersion}
      </Text>
      {todayEvents.map((e) => (
        <EventCard key={e.id} event={e} />
      ))}
      {!todayEvents.length ? (
        <Text style={styles.empty}>No events for this day. Check Calendar for the full week.</Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  brand: {
    fontSize: 28,
    fontWeight: "600",
    color: colors.gold,
    letterSpacing: 1,
    textAlign: "center",
    marginTop: spacing.sm,
  },
  eyebrow: {
    textAlign: "center",
    color: colors.muted,
    fontSize: 13,
    marginBottom: spacing.md,
  },
  panel: {
    backgroundColor: colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  panelLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.gold,
    marginBottom: 4,
  },
  panelTitle: { fontSize: 18, fontWeight: "600", color: colors.ink },
  panelMeta: { fontSize: 13, color: colors.muted, marginTop: 4 },
  link: { marginTop: 10, color: colors.gold, fontWeight: "700", fontSize: 14 },
  sectionBlock: { marginBottom: spacing.sm },
  section: { fontSize: 18, fontWeight: "700", color: colors.ink, marginTop: spacing.md },
  sectionSub: { fontSize: 12, color: colors.muted, marginBottom: spacing.sm },
  empty: { color: colors.muted, fontSize: 14, marginTop: spacing.sm },
});
