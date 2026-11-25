"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  UserRound,
  X,
} from 'lucide-react';
import { AuthControl } from '@/components/auth/AuthControl';
import { useAuth } from '@/components/auth/AuthProvider';
import { StickerIcon } from '@/components/site/StickerIcon';
import { subjects } from '@/data/subjects';

export function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const current = subjects.find((s) => path === `/${s.slug}` || path.startsWith(`/${s.slug}/`));

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open]);

  const logout = async () => {
    setOpen(false);
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <header className="sx-nav">
        <div className="shell sx-nav-in">
          <Link
            href="/"
            className="sx-logo"
            aria-label="AnimiSci home"
            onClick={() => setOpen(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" className="sx-logo-mark" />
            <span className="sx-logo-t">
              <span>animi</span>
              <span className="sx-logo-s">sci</span>
            </span>
          </Link>

          <nav className="sx-nav-links" aria-label="Main">
            {subjects.map((s) => {
              const on = current?.slug === s.slug;
              return (
                <Link key={s.slug} href={`/${s.slug}`} className={`sx-nav-link${on ? " on" : ""}`} aria-current={on ? "page" : undefined}>
                  {on ? <motion.span layoutId="sx-pill" className="sx-nav-pill" style={{ background: s.tint }} transition={{ type: "spring", stiffness: 420, damping: 34 }} /> : null}
                  <b className="sx-nav-t">{s.en}</b>
                </Link>
              );
            })}
          </nav>

          <div className="sx-nav-right">
            {current ? (
              <span className="sx-here" style={{ background: current.tint }}>
                {current.en}
              </span>
            ) : null}
            <AuthControl />
            <button type="button" className="sx-burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
              {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button type="button" className="sx-scrim" aria-label="Close menu" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              className="sx-sheet"
              role="dialog"
              aria-label="Menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {subjects.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`} className="sx-sheet-link" style={{ background: s.tint }} onClick={() => setOpen(false)}>
                  <span className="sx-sheet-ic">
                    <StickerIcon kind={s.icon} />
                  </span>
                  <span className="sx-sheet-t">
                    <b>{s.en}</b>
                    <small>{s.name}</small>
                  </span>
                </Link>
              ))}
              {user ? (
                <>
                  <Link href="/dashboard" className="sx-sheet-plain" onClick={() => setOpen(false)}>
                    <LayoutDashboard size={18} aria-hidden /> Dashboard
                  </Link>
                  <Link href="/profile" className="sx-sheet-plain" onClick={() => setOpen(false)}>
                    <UserRound size={18} aria-hidden /> Profile
                  </Link>
                  <button type="button" className="sx-sheet-plain" onClick={logout}>
                    <LogOut size={18} aria-hidden /> Log out
                  </button>
                </>
              ) : (
                <Link href="/login" className="sx-sheet-login" onClick={() => setOpen(false)}>
                  <LogIn size={18} aria-hidden /> Log in with Google
                </Link>
              )}
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
