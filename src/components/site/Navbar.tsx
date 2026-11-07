"use client";

import Link from "next/link";
import { useState } from "react";
import { ListIcon, XIcon } from "@/components/ui/icons";
import { subjects } from "@/data/subjects";
import { Logo } from "./Logo";

const links = [...subjects.map((s) => ({ href: `/${s.slug}`, label: s.name })), { href: "/#how", label: "কীভাবে শেখো" }];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="shell nav-inner">
        <Link href="/" aria-label="AnimiSci হোম" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="প্রধান মেনু" className="nav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "মেনু বন্ধ করো" : "মেনু খোলো"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <XIcon size={22} /> : <ListIcon size={22} />}
        </button>
      </div>

      {open ? (
        <nav id="mobile-menu" aria-label="মোবাইল মেনু" className="shell nav-panel">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-panel-link" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
