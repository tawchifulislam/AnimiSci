const raw = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

const origin = (value: string) => {
  try {
    return new URL(value).origin;
  } catch {
    return "";
  }
};

export const supabaseUrl = origin(raw);
export const supabaseKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();
export const authConfigured = Boolean(supabaseUrl && supabaseKey);
