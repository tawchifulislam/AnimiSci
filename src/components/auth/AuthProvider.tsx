"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { authConfigured } from "@/lib/supabase/env";

export type Profile = { display_name: string; avatar_url: string | null };

type AuthValue = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthValue>({
  user: null,
  profile: null,
  loading: false,
  refreshProfile: async () => {},
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(authConfigured);
  const [loaded, setLoaded] = useState<{ id: string; data: Profile | null } | null>(null);

  useEffect(() => {
    if (!authConfigured) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const userId = user?.id;

  const fetchProfile = useCallback(async (id: string) => {
    const supabase = createClient();
    const { data } = await supabase.from("profiles").select("display_name, avatar_url").eq("id", id).maybeSingle();
    setLoaded({ id, data: (data as Profile | null) ?? null });
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetchProfile(userId);
  }, [userId, fetchProfile]);

  const refreshProfile = useCallback(async () => {
    if (userId) await fetchProfile(userId);
  }, [userId, fetchProfile]);

  const signOut = useCallback(async () => {
    await createClient().auth.signOut();
    setUser(null);
  }, []);

  const profile = loaded && loaded.id === userId ? loaded.data : null;
  const value = useMemo(() => ({ user, profile, loading, refreshProfile, signOut }), [user, profile, loading, refreshProfile, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
