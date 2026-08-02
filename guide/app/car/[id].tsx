import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "@/constants/Theme";
import { getCar } from "@/src/content/load";

export default function CarDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = getCar(String(id));

  if (!car) {
    return (
      <View style={styles.screen}>
        <Stack.Screen options={{ title: "Car" }} />
        <Text style={styles.missing}>Car not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: `${car.make} ${car.model}` }} />
      <Text style={styles.eyebrow}>{car.showName}</Text>
      <Text style={styles.title}>
        {car.year} {car.make} {car.model}
      </Text>
      <Text style={styles.className}>{car.className}</Text>
      {car.coachwork ? <Text style={styles.meta}>Coachwork: {car.coachwork}</Text> : null}
      {car.owner ? <Text style={styles.meta}>Owner: {car.owner}</Text> : null}
      {car.description ? <Text style={styles.body}>{car.description}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md },
  missing: { padding: spacing.md, color: colors.muted },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.gold,
    letterSpacing: 0.4,
    marginBottom: 6,
  },
  title: { fontSize: 26, fontWeight: "700", color: colors.ink },
  className: { fontSize: 15, color: colors.muted, marginTop: 8 },
  meta: { fontSize: 14, color: colors.ink, marginTop: 6 },
  body: { fontSize: 15, color: colors.muted, lineHeight: 22, marginTop: spacing.md },
});
