import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { authConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { GoogleButton } from "./GoogleButton";

export const metadata: Metadata = { title: "Log in" };

type Props = { searchParams: Promise<{ next?: string; error?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const { next: rawNext, error } = await searchParams;
  const next = rawNext && rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/dashboard";

  if (authConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect(next);
  }

  return (
    <div className="shell sx-login">
      <div className="sx-login-card">
        <h1>Log in</h1>
        <p>তোমার অগ্রগতি জমা থাকবে, যেকোনো ডিভাইস থেকে আবার শুরু করতে পারবে। শুধু তোমার নাম, ছবি আর পাঠের অগ্রগতি সংরক্ষণ হবে।</p>
        {authConfigured ? (
          <GoogleButton next={next} />
        ) : (
          <p className="sx-form-err">Login is not set up yet. Add the Supabase keys to .env.local and restart the dev server.</p>
        )}
        {error ? <p className="sx-form-err">Login did not complete. Please try again.</p> : null}
      </div>
    </div>
  );
}
