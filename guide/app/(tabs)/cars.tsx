import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { colors, spacing } from "@/constants/Theme";
import { getContent } from "@/src/content/load";

export default function CarsScreen() {
  const cars = getContent().cars;
  const shows = useMemo(() => Array.from(new Set(cars.map((c) => c.showName))), [cars]);
  const [show, setShow] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = show === "all" ? cars : cars.filter((c) => c.showName === show);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (c) =>
          c.make.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.className.toLowerCase().includes(q) ||
          String(c.year).includes(q)
      );
    }
    return list;
  }, [cars, show, query]);

  return (
    <View style={styles.screen}>
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.search}
          placeholder="Search make, model, class…"
          placeholderTextColor={colors.muted}
          value={query}
          onChangeText={setQuery}
          accessibilityLabel="Search cars"
        />
      </View>

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
          Directory highlights for programmed shows. Entries marked illustrative are placeholders
          until 2026 field lists are curated.
        </Text>
        <Text style={styles.count}>{filtered.length} cars</Text>
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
        {!filtered.length ? <Text style={styles.empty}>No cars match your search.</Text> : null}
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
  note: { fontSize: 12, color: colors.muted, marginBottom: 4, lineHeight: 17 },
  count: { fontSize: 12, color: colors.muted, marginBottom: spacing.sm, fontWeight: "600" },
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
  empty: { color: colors.muted, marginTop: spacing.md },
});
