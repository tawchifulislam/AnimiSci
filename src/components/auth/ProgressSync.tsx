"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { lessonKey } from "@/lib/lesson-key";
import { markDone, useProgress } from "@/lib/progress";
import { createClient } from "@/lib/supabase/client";

export function ProgressSync() {
  const { user } = useAuth();
  const { done } = useProgress();
  const path = usePathname();
  const userId = user?.id;
  const known = useRef<Set<string> | null>(null);
  const latest = useRef<Record<string, unknown>>({});

  useEffect(() => {
    latest.current = done as Record<string, unknown>;
  });

  useEffect(() => {
    if (!userId) {
      known.current = null;
      return;
    }
    let cancelled = false;
    const supabase = createClient();

    (async () => {
      const { data, error } = await supabase.from("lesson_progress").select("lesson_key");
      if (cancelled || error || !data) return;
      const remote = new Set<string>(data.map((r: { lesson_key: string }) => r.lesson_key));
      remote.forEach((k) => {
        if (!latest.current[k]) markDone(k);
      });
      const local = Object.keys(latest.current).filter((k) => latest.current[k]);
      const missing = local.filter((k) => !remote.has(k));
      if (missing.length > 0) {
        await supabase
          .from("lesson_progress")
          .upsert(
            missing.map((lesson_key) => ({ user_id: userId, lesson_key })),
            { onConflict: "user_id,lesson_key", ignoreDuplicates: true },
          );
      }
      known.current = new Set<string>([...remote, ...missing]);
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    const prev = known.current;
    if (!userId || !prev) return;
    const now = new Set<string>(Object.keys(done).filter((k) => (done as Record<string, unknown>)[k]));
    const added = [...now].filter((k) => !prev.has(k));
    const removed = [...prev].filter((k) => !now.has(k));
    if (added.length === 0 && removed.length === 0) return;
    known.current = now;
    const supabase = createClient();
    (async () => {
      if (added.length > 0) {
        await supabase
          .from("lesson_progress")
          .upsert(
            added.map((lesson_key) => ({ user_id: userId, lesson_key })),
            { onConflict: "user_id,lesson_key", ignoreDuplicates: true },
          );
      }
      if (removed.length > 0) {
        await supabase.from("lesson_progress").delete().eq("user_id", userId).in("lesson_key", removed);
      }
    })();
  }, [done, userId]);

  useEffect(() => {
    if (!userId) return;
    const parts = path.split("/").filter(Boolean);
    if (parts.length !== 4) return;
    const key = lessonKey(parts[0], parts[1], parts[2], parts[3]);
    createClient()
      .from("profiles")
      .update({ last_lesson_key: key, last_seen_at: new Date().toISOString() })
      .eq("id", userId)
      .then(() => {});
  }, [path, userId]);

  return null;
}
