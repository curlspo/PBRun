import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors, spacing } from "@/constants/Theme";
import { accessLabel, formatDayLabel, getEvent, getVenue, mapsUrl } from "@/src/content/load";
import { usePlan } from "@/src/state/PlanContext";
import { addEventToCalendar, shareEvent } from "@/src/utils/calendar";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = getEvent(String(id));
  const venue = getVenue(event?.venueId);
  const { isSaved, toggleSaved, isCheckedIn, checkIn, removeCheckIn, getCheckIn, ready } =
    usePlan();
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  if (!event) {
    return (
      <View style={styles.screen}>
        <Stack.Screen options={{ title: "Event" }} />
        <Text style={styles.missing}>Event not found.</Text>
      </View>
    );
  }

  const saved = isSaved(event.id);
  const checked = isCheckedIn(event.id);
  const existing = getCheckIn(event.id);
  const badgeColor =
    event.access === "free" ? colors.free : event.access === "ticketed" ? colors.ticketed : colors.mixed;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: event.title }} />
      <View style={styles.badgeRow}>
        <Text style={[styles.badge, { color: badgeColor, borderColor: badgeColor }]}>
          {accessLabel(event.access)}
        </Text>
        {event.tags?.includes("must-see") ? <Text style={styles.must}>MUST-SEE</Text> : null}
      </View>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>
        {formatDayLabel(event.date)} ·{" "}
        {event.allDay ? "All day" : `${event.startTime}–${event.endTime}`} PT
      </Text>
      {venue ? (
        <Text style={styles.venue}>
          {venue.name} · {venue.area}
        </Text>
      ) : null}

      <Text style={styles.body}>{event.description}</Text>

      {event.whatToLookFor?.length ? (
        <View style={styles.block}>
          <Text style={styles.blockTitle}>What to look for</Text>
          {event.whatToLookFor.map((w) => (
            <Text key={w} style={styles.bullet}>
              • {w}
            </Text>
          ))}
        </View>
      ) : null}

      <View style={styles.actions}>
        <Pressable
          style={[styles.btn, saved && styles.btnActive]}
          onPress={() => toggleSaved(event.id)}
          disabled={!ready}
        >
          <Text style={[styles.btnText, saved && styles.btnTextActive]}>
            {saved ? "In my plan" : "Save to plan"}
          </Text>
        </Pressable>
        <Pressable
          style={styles.btn}
          disabled={busy}
          onPress={async () => {
            setBusy(true);
            try {
              await addEventToCalendar(event);
            } finally {
              setBusy(false);
            }
          }}
        >
          <Text style={styles.btnText}>Add to calendar</Text>
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={async () => {
            setBusy(true);
            try {
              await shareEvent(event);
            } finally {
              setBusy(false);
            }
          }}
        >
          <Text style={styles.btnText}>Share</Text>
        </Pressable>
        {venue ? (
          <Pressable style={styles.btn} onPress={() => Linking.openURL(mapsUrl(venue))}>
            <Text style={styles.btnText}>Directions</Text>
          </Pressable>
        ) : null}
        {event.infoUrl ? (
          <Pressable style={styles.btn} onPress={() => Linking.openURL(event.infoUrl)}>
            <Text style={styles.btnText}>Official info</Text>
          </Pressable>
        ) : null}
        {event.ticketUrl ? (
          <Pressable style={styles.btn} onPress={() => Linking.openURL(event.ticketUrl!)}>
            <Text style={styles.btnText}>Tickets</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Check in</Text>
        {checked ? (
          <>
            <Text style={styles.body}>
              Checked in {existing?.at ? new Date(existing.at).toLocaleString() : ""}.
              {existing?.note ? ` Note: “${existing.note}”` : ""}
            </Text>
            <Pressable
              style={[styles.btn, { marginTop: 10 }]}
              onPress={() => removeCheckIn(event.id)}
              disabled={!ready}
            >
              <Text style={styles.btnText}>Remove check-in</Text>
            </Pressable>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Private note (optional)"
              placeholderTextColor={colors.muted}
              value={note}
              onChangeText={setNote}
              accessibilityLabel="Private check-in note"
            />
            <Pressable
              style={[styles.btn, styles.btnPrimary]}
              onPress={() => checkIn(event.id, note)}
              disabled={!ready}
            >
              <Text style={[styles.btnText, styles.btnTextActive]}>Check in</Text>
            </Pressable>
          </>
        )}
      </View>

      <Text style={styles.verified}>Last verified {event.lastVerifiedAt} · times in PT</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  missing: { padding: spacing.md, color: colors.muted },
  badgeRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  badge: {
    alignSelf: "flex-start",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  must: { fontSize: 11, fontWeight: "800", color: colors.gold, letterSpacing: 0.5 },
  title: { fontSize: 26, fontWeight: "700", color: colors.ink },
  meta: { fontSize: 14, color: colors.muted, marginTop: 6, fontWeight: "600" },
  venue: { fontSize: 14, color: colors.gold, marginTop: 4, fontWeight: "600" },
  body: { fontSize: 15, color: colors.muted, lineHeight: 22, marginTop: spacing.md },
  block: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
  },
  blockTitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: colors.gold,
    marginBottom: 8,
  },
  bullet: { fontSize: 14, color: colors.ink, marginBottom: 4, lineHeight: 20 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: spacing.md },
  btn: {
    borderWidth: 1.5,
    borderColor: colors.gold,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 44,
    justifyContent: "center",
  },
  btnPrimary: { backgroundColor: colors.gold },
  btnActive: { backgroundColor: colors.ink, borderColor: colors.ink },
  btnText: { color: colors.ink, fontWeight: "700", fontSize: 14 },
  btnTextActive: { color: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.ink,
    backgroundColor: "#fff",
    marginBottom: 10,
    minHeight: 44,
  },
  verified: { marginTop: spacing.md, fontSize: 11, color: colors.muted },
});
