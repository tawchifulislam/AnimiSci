import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "./env";

let client: SupabaseClient | null = null;

export function createClient(): SupabaseClient {
  if (!client) client = createBrowserClient(supabaseUrl, supabaseKey) as SupabaseClient;
  return client;
}
