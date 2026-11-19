import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Avatar } from "@/components/auth/Avatar";
import { buildCatalog, dayKey, lastDays, shortDate, streakOf } from "@/lib/progress-data";
import { authConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Dashboard" };

type Row = { lesson_key: string; completed_at: string };

export default async function DashboardPage() {
  if (!authConfigured) {
    return (
      <div className="shell sx-login">
        <div className="sx-login-card">
          <h1>Dashboard</h1>
          <p className="sx-form-err">Login is not set up yet. Add the Supabase keys to .env.local and restart the dev server.</p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard");

  const [{ data: profile }, { data: rawRows }] = await Promise.all([
    supabase.from("profiles").select("display_name, avatar_url, last_lesson_key, created_at").eq("id", user.id).maybeSingle(),
    supabase.from("lesson_progress").select("lesson_key, completed_at").order("completed_at", { ascending: false }),
  ]);

  const meta = user.user_metadata as { full_name?: string; avatar_url?: string; picture?: string };
  const name = profile?.display_name ?? meta.full_name ?? "Student";
  const avatar = profile ? profile.avatar_url : (meta.avatar_url ?? meta.picture ?? null);

  const { lessons, chapters } = buildCatalog();
  const rows = ((rawRows ?? []) as Row[]).filter((r) => lessons.has(r.lesson_key));
  const doneSet = new Set(rows.map((r) => r.lesson_key));
  const total = lessons.size;
  const done = doneSet.size;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  const days = new Set(rows.map((r) => dayKey(r.completed_at)));
  const streak = streakOf(days);
  const week = lastDays(7).map((d) => ({ ...d, n: rows.filter((r) => dayKey(r.completed_at) === d.key).length }));
  const weekTotal = week.reduce((n, d) => n + d.n, 0);
  const weekMax = Math.max(1, ...week.map((d) => d.n));

  const lastKey = profile?.last_lesson_key as string | null | undefined;
  const next = (lastKey && lessons.get(lastKey)) || [...lessons.values()].find((l) => !doneSet.has(l.key)) || null;
  const recent = rows.slice(0, 8);

  const circ = 2 * Math.PI * 40;
  const joined = profile?.created_at ? shortDate(profile.created_at) : null;

  return (
    <div className="shell sx-dash">
      <section className="sx-dash-head">
        <Avatar name={name} src={avatar} size={88} />
        <div className="sx-dash-who">
          <h1>{name}</h1>
          <p>{user.email}</p>
          {joined ? <p>Joined {joined}</p> : null}
        </div>
        <Link href="/profile" className="btn btn-ghost">
          Edit profile
        </Link>
      </section>

      <section className="sx-stats">
        <div className="sx-stat" style={{ "--tint": "#9ccbff" } as CSSProperties}>
          <b>{done}</b>
          <span>of {total} lessons done</span>
        </div>
        <div className="sx-stat" style={{ "--tint": "#ffe27a" } as CSSProperties}>
          <b>{streak}</b>
          <span>{streak === 1 ? "day streak" : "day streak"}</span>
        </div>
        <div className="sx-stat" style={{ "--tint": "#8be6bb" } as CSSProperties}>
          <b>{weekTotal}</b>
          <span>lessons this week</span>
        </div>
        <div className="sx-stat sx-stat-ring" style={{ "--tint": "#e9ccff" } as CSSProperties}>
          <svg viewBox="0 0 100 100" aria-hidden>
            <circle cx={50} cy={50} r={40} fill="none" stroke="rgba(23,26,44,0.18)" strokeWidth={12} />
            <circle cx={50} cy={50} r={40} fill="none" stroke="#171a2c" strokeWidth={12} strokeLinecap="round" strokeDasharray={`${(circ * percent) / 100} ${circ}`} transform="rotate(-90 50 50)" />
          </svg>
          <b>{percent}%</b>
          <span>overall</span>
        </div>
      </section>

      <div className="sx-dash-grid">
        <div className="sx-dash-col">
          <section className="sx-panel">
            <h2>{done > 0 ? "Continue" : "Get started"}</h2>
            {next ? (
              <Link href={next.href} className="sx-continue" style={{ "--tint": next.tint } as CSSProperties}>
                <span>
                  <small>
                    {next.subject} · {next.chapter}
                  </small>
                  <strong>{next.title}</strong>
                </span>
                <span className="sx-go">{done > 0 ? "Continue →" : "Start →"}</span>
              </Link>
            ) : (
              <p className="sx-muted">All available lessons are done. New chapters are on the way.</p>
            )}
          </section>

          <section className="sx-panel">
            <h2>Recent activity</h2>
            {recent.length > 0 ? (
              <ul className="sx-recent">
                {recent.map((r) => {
                  const l = lessons.get(r.lesson_key);
                  if (!l) return null;
                  return (
                    <li key={r.lesson_key}>
                      <Link href={l.href}>
                        <i style={{ background: l.tint }} />
                        <span>
                          <strong>{l.title}</strong>
                          <small>{l.chapter}</small>
                        </span>
                        <time>{shortDate(r.completed_at)}</time>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="sx-muted">Finish a lesson and it shows up here.</p>
            )}
          </section>
        </div>

        <div className="sx-dash-col">
          <section className="sx-panel">
            <h2>This week</h2>
            <div className="sx-week">
              {week.map((d) => (
                <div key={d.key} className="sx-week-day">
                  <span className="sx-week-bar">
                    <i style={{ height: `${(d.n / weekMax) * 100}%` }} />
                  </span>
                  <small>{d.label}</small>
                  <b>{d.n}</b>
                </div>
              ))}
            </div>
          </section>

          <section className="sx-panel">
            <h2>Chapters</h2>
            <ul className="sx-chap">
              {chapters.map((ch) => {
                const n = ch.keys.filter((k) => doneSet.has(k)).length;
                const pct = ch.keys.length > 0 ? Math.round((n / ch.keys.length) * 100) : 0;
                return (
                  <li key={ch.id}>
                    <Link href={ch.href}>
                      <span className="sx-chap-top">
                        <strong>{ch.name}</strong>
                        <small>
                          {ch.subject} · {n}/{ch.keys.length}
                        </small>
                      </span>
                      <span className="sx-bar">
                        <i style={{ width: `${pct}%`, background: ch.tint }} />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
