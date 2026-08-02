import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const SAVED_KEY = "pbcrun_saved_events";
const CHECKINS_KEY = "pbcrun_checkins";

export type CheckIn = {
  eventId: string;
  at: string;
  note?: string;
};

async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function usePlan() {
  const [saved, setSaved] = useState<string[]>([]);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const [s, c] = await Promise.all([
        readJson<string[]>(SAVED_KEY, []),
        readJson<CheckIn[]>(CHECKINS_KEY, []),
      ]);
      setSaved(s);
      setCheckIns(c);
      setReady(true);
    })();
  }, []);

  const persistSaved = useCallback(async (next: string[]) => {
    setSaved(next);
    await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(next));
  }, []);

  const persistCheckIns = useCallback(async (next: CheckIn[]) => {
    setCheckIns(next);
    await AsyncStorage.setItem(CHECKINS_KEY, JSON.stringify(next));
  }, []);

  const toggleSaved = useCallback(
    async (eventId: string) => {
      const next = saved.includes(eventId)
        ? saved.filter((id) => id !== eventId)
        : [...saved, eventId];
      await persistSaved(next);
    },
    [saved, persistSaved]
  );

  const isSaved = useCallback((eventId: string) => saved.includes(eventId), [saved]);

  const checkIn = useCallback(
    async (eventId: string, note?: string) => {
      const filtered = checkIns.filter((c) => c.eventId !== eventId);
      const next = [
        ...filtered,
        { eventId, at: new Date().toISOString(), note: note?.trim() || undefined },
      ];
      await persistCheckIns(next);
    },
    [checkIns, persistCheckIns]
  );

  const isCheckedIn = useCallback(
    (eventId: string) => checkIns.some((c) => c.eventId === eventId),
    [checkIns]
  );

  const getCheckIn = useCallback(
    (eventId: string) => checkIns.find((c) => c.eventId === eventId),
    [checkIns]
  );

  return {
    ready,
    saved,
    checkIns,
    toggleSaved,
    isSaved,
    checkIn,
    isCheckedIn,
    getCheckIn,
  };
}
