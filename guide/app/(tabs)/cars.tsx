import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "@/constants/Theme";
import { getContent } from "@/src/content/load";

export default function CarsScreen() {
  const cars = getContent().cars;
  const shows = useMemo(() => Array.from(new Set(cars.map((c) => c.showName))), [cars]);
  const [show, setShow] = useState<string>("all");

  const filtered = show === "all" ? cars : cars.filter((c) => c.showName === show);

  return (
    <View style={styles.screen}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      >
        <Pressable
          onPress={() => setShow("all")}
          style={[styles.chip, show === "all" && styles.chipActive]}
        >
          <Text style={[styles.chipText, show === "all" && styles.chipTextActive]}>All shows</Text>
        </Pressable>
        {shows.map((s) => (
          <Pressable
            key={s}
            onPress={() => setShow(s)}
            style={[styles.chip, show === s && styles.chipActive]}
          >
            <Text style={[styles.chipText, show === s && styles.chipTextActive]} numberOfLines={1}>
              {s}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.list}>
        <Text style={styles.note}>
          Directory seed for programmed shows. Entries marked illustrative are placeholders until
          2026 field lists are curated.
        </Text>
        {filtered.map((car) => (
          <Link key={car.id} href={`/car/${car.id}`} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.yearMake}>
                {car.year} {car.make}
              </Text>
              <Text style={styles.model}>{car.model}</Text>
              <Text style={styles.meta}>{car.className}</Text>
              <Text style={styles.show}>{car.showName}</Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  filters: { padding: spacing.sm, gap: 8, alignItems: "center" },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.card,
    marginRight: 8,
    maxWidth: 220,
  },
  chipActive: { backgroundColor: colors.gold, borderColor: colors.gold },
  chipText: { fontSize: 13, fontWeight: "600", color: colors.ink },
  chipTextActive: { color: "#fff" },
  list: { padding: spacing.md, paddingBottom: spacing.xl },
  note: { fontSize: 12, color: colors.muted, marginBottom: spacing.sm, lineHeight: 17 },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  yearMake: { fontSize: 12, fontWeight: "700", color: colors.gold, letterSpacing: 0.4 },
  model: { fontSize: 18, fontWeight: "600", color: colors.ink, marginTop: 2 },
  meta: { fontSize: 13, color: colors.muted, marginTop: 4 },
  show: { fontSize: 12, color: colors.ink, marginTop: 8, fontWeight: "600" },
});
