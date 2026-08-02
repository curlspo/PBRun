import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { EventCard } from "@/components/EventCard";
import { colors, spacing } from "@/constants/Theme";
import { eventsForToday, featuredCars, formatDayLabel, getContent, nextEvent } from "@/src/content/load";

export default function HomeScreen() {
  const content = getContent();
  const todayEvents = eventsForToday();
  const next = nextEvent();
  const featured = featuredCars()[0];
  const dayLabel = todayEvents[0] ? formatDayLabel(todayEvents[0].date) : "Car Week 2026";

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.brand}>PBCRun</Text>
      <Text style={styles.eyebrow}>Unofficial Monterey Car Week companion</Text>

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          PBCRun is an unofficial guide not affiliated with the Pebble Beach Concours d’Elegance.
        </Text>
      </View>

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

      <Text style={styles.section}>{dayLabel}</Text>
      <Text style={styles.sectionSub}>{todayEvents.length} events · content {content.contentVersion}</Text>
      {todayEvents.map((e) => (
        <EventCard key={e.id} event={e} />
      ))}
      {!todayEvents.length ? (
        <Text style={styles.empty}>No events loaded for this day. Check Calendar for the full week.</Text>
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
  disclaimer: {
    backgroundColor: colors.chip,
    borderRadius: 8,
    padding: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
  },
  disclaimerText: { color: colors.muted, fontSize: 12, lineHeight: 17, textAlign: "center" },
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
  section: { fontSize: 18, fontWeight: "700", color: colors.ink, marginTop: spacing.md },
  sectionSub: { fontSize: 12, color: colors.muted, marginBottom: spacing.sm },
  empty: { color: colors.muted, fontSize: 14, marginTop: spacing.sm },
});
