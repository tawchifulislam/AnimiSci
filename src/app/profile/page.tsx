import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { authConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "./ProfileForm";

export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage() {
  if (!authConfigured) {
    return (
      <div className="shell sx-login">
        <div className="sx-login-card">
          <h1>Profile</h1>
          <p className="sx-form-err">Login is not set up yet. Add the Supabase keys to .env.local and restart the dev server.</p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/profile");

  const { data: profile } = await supabase.from("profiles").select("display_name, avatar_url").eq("id", user.id).maybeSingle();
  const meta = user.user_metadata as { full_name?: string; avatar_url?: string; picture?: string };
  const googleAvatar = meta.avatar_url ?? meta.picture ?? null;

  return (
    <div className="shell sx-profile">
      <h1 className="sx-profile-title">Profile</h1>
      <ProfileForm
        userId={user.id}
        email={user.email ?? ""}
        initialName={profile?.display_name ?? meta.full_name ?? "Student"}
        initialAvatar={profile ? profile.avatar_url : googleAvatar}
        googleAvatar={googleAvatar}
      />
    </div>
  );
}
