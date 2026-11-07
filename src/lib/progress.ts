import { useSyncExternalStore } from "react";

const KEY = "animisci:progress:v1";

export type ProgressState = { done: Record<string, number>; last: string | null };

const empty: ProgressState = { done: {}, last: null };
let cache: ProgressState = empty;
let loaded = false;
const listeners = new Set<() => void>();

function read(): ProgressState {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...empty, ...(JSON.parse(raw) as Partial<ProgressState>) } : empty;
  } catch {
    return empty;
  }
}

function snapshot(): ProgressState {
  if (!loaded) {
    cache = read();
    loaded = true;
  }
  return cache;
}

function write(next: ProgressState) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: keep in-memory state only */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = read();
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, snapshot, () => empty);
}

export function markDone(key: string) {
  const s = snapshot();
  if (s.done[key]) return;
  write({ ...s, done: { ...s.done, [key]: Date.now() } });
}

export function toggleDone(key: string) {
  const s = snapshot();
  if (s.done[key]) {
    const rest = { ...s.done };
    delete rest[key];
    write({ ...s, done: rest });
  } else {
    write({ ...s, done: { ...s.done, [key]: Date.now() } });
  }
}

export function setLast(key: string) {
  const s = snapshot();
  if (s.last === key) return;
  write({ ...s, last: key });
}
