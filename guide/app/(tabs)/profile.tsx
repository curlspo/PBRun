import { ScrollView, StyleSheet, Text, View } from "react-native";

import { EventCard } from "@/components/EventCard";
import { colors, spacing } from "@/constants/Theme";
import { getContent, getEvent } from "@/src/content/load";
import { usePlan } from "@/src/state/plan";

export default function ProfileScreen() {
  const { ready, saved, checkIns } = usePlan();
  const content = getContent();

  const savedEvents = saved
    .map((id) => getEvent(id))
    .filter(Boolean)
    .sort((a, b) => a!.date.localeCompare(b!.date));

  const log = [...checkIns].sort((a, b) => b.at.localeCompare(a.at));

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>My Car Week</Text>
      <Text style={styles.sub}>Private on this device · content {content.contentVersion}</Text>

      <Text style={styles.section}>Check-ins</Text>
      {!ready ? <Text style={styles.muted}>Loading…</Text> : null}
      {ready && !log.length ? (
        <Text style={styles.muted}>No check-ins yet. Open an event and tap Check in.</Text>
      ) : null}
      {log.map((c) => {
        const ev = getEvent(c.eventId);
        return (
          <View key={c.eventId + c.at} style={styles.logRow}>
            <Text style={styles.logTitle}>{ev?.title ?? c.eventId}</Text>
            <Text style={styles.logMeta}>{new Date(c.at).toLocaleString()}</Text>
            {c.note ? <Text style={styles.note}>“{c.note}”</Text> : null}
          </View>
        );
      })}

      <Text style={styles.section}>Saved events</Text>
      {savedEvents.map((e) => (e ? <EventCard key={e.id} event={e} compact /> : null))}
      {ready && !savedEvents.length ? (
        <Text style={styles.muted}>Save events from detail pages to build your plan.</Text>
      ) : null}

      <View style={styles.about}>
        <Text style={styles.aboutTitle}>About</Text>
        <Text style={styles.disclaimer}>
          PBCRun is an independent guide to Monterey Car Week. Schedules can change — confirm times on each event’s official link.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  h1: { fontSize: 24, fontWeight: "700", color: colors.ink },
  sub: { fontSize: 12, color: colors.muted, marginBottom: spacing.md },
  section: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.ink,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  muted: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  logRow: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  logTitle: { fontSize: 16, fontWeight: "600", color: colors.ink },
  logMeta: { fontSize: 12, color: colors.muted, marginTop: 4 },
  note: { fontSize: 14, color: colors.ink, marginTop: 8, fontStyle: "italic" },
  about: { marginTop: spacing.lg, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.line },
  aboutTitle: { fontWeight: "700", color: colors.ink, marginBottom: 6 },
  disclaimer: { color: colors.muted, fontSize: 13, lineHeight: 18 },
});
