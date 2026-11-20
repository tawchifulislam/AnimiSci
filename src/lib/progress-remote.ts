import { createClient } from "@/lib/supabase/client";
import { authConfigured } from "@/lib/supabase/env";

export async function pushDone(key: string, done: boolean) {
  if (!authConfigured) return;
  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    const id = data.session?.user.id;
    if (!id) return;
    const { error } = done
      ? await supabase.from("lesson_progress").upsert({ user_id: id, lesson_key: key }, { onConflict: "user_id,lesson_key", ignoreDuplicates: true })
      : await supabase.from("lesson_progress").delete().eq("user_id", id).eq("lesson_key", key);
    if (error) console.error("progress sync failed:", error.message);
  } catch (e) {
    console.error("progress sync failed:", e);
  }
}
