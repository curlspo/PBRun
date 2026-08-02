import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const SAVED_KEY = "pbcrun_saved_events";
const CHECKINS_KEY = "pbcrun_checkins";

export type CheckIn = {
  eventId: string;
  at: string;
  note?: string;
};

type PlanContextValue = {
  ready: boolean;
  saved: string[];
  checkIns: CheckIn[];
  toggleSaved: (eventId: string) => Promise<void>;
  isSaved: (eventId: string) => boolean;
  checkIn: (eventId: string, note?: string) => Promise<void>;
  removeCheckIn: (eventId: string) => Promise<void>;
  isCheckedIn: (eventId: string) => boolean;
  getCheckIn: (eventId: string) => CheckIn | undefined;
  clearAll: () => Promise<void>;
};

const PlanContext = createContext<PlanContextValue | null>(null);

async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
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

  const removeCheckIn = useCallback(
    async (eventId: string) => {
      await persistCheckIns(checkIns.filter((c) => c.eventId !== eventId));
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

  const clearAll = useCallback(async () => {
    await persistSaved([]);
    await persistCheckIns([]);
  }, [persistSaved, persistCheckIns]);

  const value = useMemo(
    () => ({
      ready,
      saved,
      checkIns,
      toggleSaved,
      isSaved,
      checkIn,
      removeCheckIn,
      isCheckedIn,
      getCheckIn,
      clearAll,
    }),
    [
      ready,
      saved,
      checkIns,
      toggleSaved,
      isSaved,
      checkIn,
      removeCheckIn,
      isCheckedIn,
      getCheckIn,
      clearAll,
    ]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) {
    throw new Error("usePlan must be used within PlanProvider");
  }
  return ctx;
}
