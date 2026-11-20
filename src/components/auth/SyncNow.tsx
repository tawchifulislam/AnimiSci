"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useProgress } from "@/lib/progress";
import { createClient } from "@/lib/supabase/client";

export function SyncNow() {
  const router = useRouter();
  const { user } = useAuth();
  const { done } = useProgress();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const run = async () => {
    if (!user) return;
    setBusy(true);
    setMsg(null);
    const keys = Object.keys(done).filter((k) => (done as Record<string, unknown>)[k]);
    if (keys.length === 0) {
      setMsg("Nothing to sync on this device.");
      setBusy(false);
      return;
    }
    const { error } = await createClient()
      .from("lesson_progress")
      .upsert(
        keys.map((lesson_key) => ({ user_id: user.id, lesson_key })),
        { onConflict: "user_id,lesson_key", ignoreDuplicates: true },
      );
    if (error) {
      setMsg(`Sync failed: ${error.message}`);
    } else {
      setMsg(`${keys.length} lessons synced.`);
      router.refresh();
    }
    setBusy(false);
  };

  return (
    <div className="sx-sync">
      <button type="button" className="btn btn-ghost" onClick={run} disabled={busy}>
        <RefreshCw size={16} className={busy ? "sx-spin" : undefined} aria-hidden /> {busy ? "Syncing..." : "Sync progress"}
      </button>
      {msg ? <small>{msg}</small> : null}
    </div>
  );
}
