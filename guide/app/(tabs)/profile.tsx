import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { EventCard } from "@/components/EventCard";
import { colors, spacing } from "@/constants/Theme";
import { getContent, getEvent } from "@/src/content/load";
import { usePlan } from "@/src/state/PlanContext";

export default function ProfileScreen() {
  const { ready, saved, checkIns, removeCheckIn, clearAll } = usePlan();
  const content = getContent();

  const savedEvents = saved
    .map((id) => getEvent(id))
    .filter(Boolean)
    .sort((a, b) => a!.date.localeCompare(b!.date));

  const log = [...checkIns].sort((a, b) => b.at.localeCompare(a.at));

  const onClear = () => {
    const run = () => clearAll();
    if (Platform.OS === "web") {
      if (typeof window !== "undefined" && window.confirm("Clear all saved events and check-ins on this device?")) {
        run();
      }
      return;
    }
    Alert.alert("Clear plan", "Remove all saved events and check-ins on this device?", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: run },
    ]);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>My Car Week</Text>
      <Text style={styles.sub}>Private on this device · content {content.contentVersion}</Text>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statN}>{saved.length}</Text>
          <Text style={styles.statL}>Saved</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statN}>{checkIns.length}</Text>
          <Text style={styles.statL}>Check-ins</Text>
        </View>
      </View>

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
            <Pressable onPress={() => removeCheckIn(c.eventId)} style={styles.linkBtn}>
              <Text style={styles.linkBtnText}>Remove</Text>
            </Pressable>
          </View>
        );
      })}

      <Text style={styles.section}>Saved events</Text>
      {savedEvents.map((e) => (e ? <EventCard key={e.id} event={e} compact /> : null))}
      {ready && !savedEvents.length ? (
        <Text style={styles.muted}>Save events from the calendar or detail pages (★) to build your plan.</Text>
      ) : null}

      {ready && (saved.length > 0 || checkIns.length > 0) ? (
        <Pressable style={styles.clearBtn} onPress={onClear}>
          <Text style={styles.clearText}>Clear plan & check-ins</Text>
        </Pressable>
      ) : null}

      <View style={styles.about}>
        <Text style={styles.aboutTitle}>About</Text>
        <Text style={styles.disclaimer}>
          PBCRun is an independent guide to Monterey Car Week. Schedules can change — confirm times
          on each event’s official link.
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
  stats: { flexDirection: "row", gap: 12, marginBottom: spacing.md },
  stat: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    padding: spacing.md,
    alignItems: "center",
  },
  statN: { fontSize: 22, fontWeight: "700", color: colors.gold },
  statL: { fontSize: 12, color: colors.muted, marginTop: 2, fontWeight: "600" },
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
  linkBtn: { marginTop: 8, minHeight: 36, justifyContent: "center" },
  linkBtnText: { color: colors.gold, fontWeight: "700", fontSize: 13 },
  clearBtn: {
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    minHeight: 44,
  },
  clearText: { color: colors.danger, fontWeight: "700" },
  about: { marginTop: spacing.lg, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.line },
  aboutTitle: { fontWeight: "700", color: colors.ink, marginBottom: 6 },
  disclaimer: { color: colors.muted, fontSize: 13, lineHeight: 18 },
});
