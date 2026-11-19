import { createBrowserClient } from "@supabase/ssr";
import { supabaseKey, supabaseUrl } from "./env";

let client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (!client) client = createBrowserClient(supabaseUrl, supabaseKey);
  return client;
}
