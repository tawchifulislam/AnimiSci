"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/auth/Avatar";
import { useAuth } from "@/components/auth/AuthProvider";

export function AuthControl() {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (loading) return <span className="sx-avatar-skel" aria-hidden />;

  if (!user) {
    return (
      <Link href="/login" className="sx-nav-cta">
        Log in
      </Link>
    );
  }

  const meta = user.user_metadata as { full_name?: string; avatar_url?: string; picture?: string };
  const name = profile?.display_name ?? meta.full_name ?? "Student";
  const src = profile ? profile.avatar_url : (meta.avatar_url ?? meta.picture ?? null);

  const logout = async () => {
    setOpen(false);
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="sx-avatar-wrap" ref={ref}>
      <button type="button" className="sx-avatar-btn" aria-label="Account menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <Avatar name={name} src={src} size={36} />
      </button>
      {open ? (
        <div className="sx-menu" role="menu">
          <p className="sx-menu-name">{name}</p>
          <Link href="/dashboard" role="menuitem" onClick={() => setOpen(false)}>
            Dashboard
          </Link>
          <Link href="/profile" role="menuitem" onClick={() => setOpen(false)}>
            Profile
          </Link>
          <button type="button" role="menuitem" onClick={logout}>
            Log out
          </button>
        </div>
      ) : null}
    </div>
  );
}
