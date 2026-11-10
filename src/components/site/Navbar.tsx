"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, type CSSProperties } from "react";
import { ContinueCard } from "@/components/progress/ContinueCard";
import { subjectIcon } from "@/components/site/subject-icons";
import { ArrowRightIcon, MenuIcon, XIcon } from "@/components/ui/icons";
import { subjects } from "@/data/subjects";
import { Logo } from "./Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const close = () => setOpen(false);
  const current = subjects.find((s) => path === `/${s.slug}` || path.startsWith(`/${s.slug}/`));

  return (
    <>
      <header className="nav">
        <div className="shell nav-inner">
          <Link href="/" aria-label="AnimiSci হোম" onClick={close}>
            <Logo />
          </Link>

          <nav aria-label="প্রধান মেনু" className="nav-links">
            {subjects.map((s) => {
              const on = current?.slug === s.slug;
              return (
                <Link key={s.slug} href={`/${s.slug}`} className="nav-link" aria-current={on ? "true" : undefined}>
                  {on ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="nav-pill"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="nav-text">{s.name}</span>
                </Link>
              );
            })}
            <Link href="/#how" className="nav-link">
              <span className="nav-text">এক নজরে</span>
            </Link>
          </nav>

          {current ? (
            <span className="nav-here" style={{ "--sc": current.color } as CSSProperties}>
              {current.name}
            </span>
          ) : null}

          <button type="button" className="menu-btn" aria-label={open ? "মেনু বন্ধ করো" : "মেনু খোলো"} aria-expanded={open} aria-controls="sheet" onClick={() => setOpen((v) => !v)}>
            {open ? <XIcon size={24} weight="bold" /> : <MenuIcon size={24} weight="bold" />}
          </button>
        </div>
      </header>

      {open ? (
        <nav id="sheet" aria-label="মোবাইল মেনু" className="sheet">
          <div onClick={close}>
            <ContinueCard />
          </div>
          {subjects.map((s) => {
            const Icon = subjectIcon(s.icon);
            return (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="sheet-link"
                aria-current={current?.slug === s.slug ? "true" : undefined}
                style={{ "--sc": s.color } as CSSProperties}
                onClick={close}
              >
                <span className="ico">
                  <Icon size={22} weight="duotone" />
                </span>
                {s.name}
                <ArrowRightIcon size={20} weight="bold" className="go" />
              </Link>
            );
          })}
          <Link href="/#how" className="sheet-link" onClick={close}>
            <span className="ico">
              <ArrowRightIcon size={22} weight="bold" />
            </span>
            এক নজরে
          </Link>
        </nav>
      ) : null}
    </>
  );
}
