import type { CSSProperties, ReactNode } from "react";
import { SubjectArt } from "./SubjectArt";

export function PageHeader({
  eyebrow,
  title,
  sub,
  color,
  art,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  color?: string;
  art?: string;
  children?: ReactNode;
}) {
  const style = color ? ({ "--sc": color } as CSSProperties) : undefined;
  return (
    <header className="banner" style={style}>
      <div style={{ display: "grid", gap: "0.7rem", alignContent: "center" }}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="banner-title">{title}</h1>
        {sub ? <p className="banner-sub">{sub}</p> : null}
        {children}
      </div>
      {art ? (
        <div className="banner-art" aria-hidden>
          <SubjectArt kind={art} />
        </div>
      ) : null}
    </header>
  );
}
