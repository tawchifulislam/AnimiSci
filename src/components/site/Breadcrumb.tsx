import Link from "next/link";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="breadcrumb" className="crumbs">
      {items.map((it, i) => (
        <span key={`${it.label}-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", flexShrink: 0 }}>
          {i > 0 ? (
            <span className="sep" aria-hidden>
              /
            </span>
          ) : null}
          {it.href ? <Link href={it.href}>{it.label}</Link> : <span className="here">{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}
