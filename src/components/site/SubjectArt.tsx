const TAU = Math.PI * 2;

function helix() {
  const period = 22 * TAU;
  const strandA: string[] = [];
  const strandB: string[] = [];
  for (let x = -140; x <= 380; x += 4) {
    const y = 63 + 30 * Math.sin(x / 22);
    const y2 = 63 - 30 * Math.sin(x / 22);
    strandA.push(`${strandA.length ? "L" : "M"}${x} ${y.toFixed(1)}`);
    strandB.push(`${strandB.length ? "L" : "M"}${x} ${y2.toFixed(1)}`);
  }
  const rungs: { x: number; y1: number; y2: number; o: number }[] = [];
  const step = period / 12;
  for (let x = -period; x <= 380; x += step) {
    const s = Math.sin(x / 22);
    rungs.push({ x: +x.toFixed(1), y1: +(63 + 30 * s).toFixed(1), y2: +(63 - 30 * s).toFixed(1), o: +(0.18 + 0.6 * Math.abs(s)).toFixed(2) });
  }
  return { a: strandA.join(""), b: strandB.join(""), rungs };
}

function curve() {
  const pts: string[] = [];
  for (let x = 24; x <= 216; x += 3) {
    const y = 63 - 34 * Math.sin((x - 24) / 21);
    pts.push(`${pts.length ? "L" : "M"}${x} ${y.toFixed(1)}`);
  }
  return pts.join("");
}

function Atom() {
  const orbit = "M52 0 a52 19 0 1 1 -104 0 a52 19 0 1 1 104 0";
  return (
    <svg viewBox="0 0 240 126" aria-hidden focusable="false">
      <g fill="currentColor" opacity=".35">
        <circle cx="26" cy="22" r="1.6" />
        <circle cx="214" cy="34" r="1.6" />
        <circle cx="198" cy="104" r="1.6" />
        <circle cx="40" cy="98" r="1.6" />
      </g>
      {[0, 60, 120].map((r) => (
        <g key={r} transform={`translate(120 63) rotate(${r})`}>
          <ellipse rx="52" ry="19" fill="none" stroke="currentColor" strokeWidth="1.6" opacity=".6" />
          <circle r="4.6" fill="currentColor">
            <animateMotion dur={`${3.2 + r / 60}s`} repeatCount="indefinite" path={orbit} />
          </circle>
        </g>
      ))}
      <circle className="art-pulse" cx="120" cy="63" r="13" fill="currentColor" opacity=".2" />
      <circle cx="120" cy="63" r="7" fill="currentColor" />
    </svg>
  );
}

function Flask() {
  return (
    <svg viewBox="0 0 240 126" aria-hidden focusable="false">
      <defs>
        <clipPath id="art-flask-clip">
          <path d="M108 20 V54 L80 100 Q73 114 88 114 H152 Q167 114 160 100 L132 54 V20 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#art-flask-clip)">
        <g className="art-wave">
          <path d="M40 80 Q55 72 70 80 T100 80 T130 80 T160 80 T190 80 T220 80 T250 80 V130 H40 Z" fill="currentColor" opacity=".4" />
        </g>
        <circle className="art-bubble" cx="112" cy="104" r="4" fill="currentColor" opacity=".8" style={{ animationDelay: "0s" }} />
        <circle className="art-bubble" cx="128" cy="100" r="3" fill="currentColor" opacity=".8" style={{ animationDelay: "1.1s" }} />
        <circle className="art-bubble" cx="120" cy="106" r="2.4" fill="currentColor" opacity=".8" style={{ animationDelay: "2.1s" }} />
      </g>
      <path d="M108 20 V54 L80 100 Q73 114 88 114 H152 Q167 114 160 100 L132 54 V20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M102 20 H138" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <g fill="currentColor" opacity=".35">
        <circle cx="40" cy="30" r="2" />
        <circle cx="204" cy="44" r="2" />
        <circle cx="190" cy="100" r="2" />
      </g>
    </svg>
  );
}

function Dna() {
  const h = helix();
  return (
    <svg viewBox="0 0 240 126" aria-hidden focusable="false">
      <g className="art-helix">
        {h.rungs.map((r) => (
          <line key={r.x} x1={r.x} y1={r.y1} x2={r.x} y2={r.y2} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity={r.o} />
        ))}
        <path d={h.a} fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
        <path d={h.b} fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" opacity=".55" />
      </g>
    </svg>
  );
}

function Sigma() {
  return (
    <svg viewBox="0 0 240 126" aria-hidden focusable="false">
      <g stroke="currentColor" opacity=".28" strokeWidth="1.4" fill="none">
        <path d="M18 63 H222 M24 14 V112" />
        <path d="M60 58 V68 M96 58 V68 M132 58 V68 M168 58 V68 M204 58 V68" />
      </g>
      <path d={curve()} fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" opacity=".9" />
      <circle r="9" fill="currentColor" opacity=".25">
        <animateMotion dur="5s" repeatCount="indefinite" path={curve()} />
      </circle>
      <circle r="4.8" fill="currentColor">
        <animateMotion dur="5s" repeatCount="indefinite" path={curve()} />
      </circle>
      <text x="196" y="30" fontSize="26" fontWeight="700" fill="currentColor" opacity=".4" fontFamily="serif" fontStyle="italic">
        Σ
      </text>
    </svg>
  );
}

function Pages() {
  return (
    <svg viewBox="0 0 240 126" aria-hidden focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="70" y="22" width="76" height="88" rx="9" opacity=".35" transform="rotate(-8 108 66)" />
        <rect x="88" y="16" width="76" height="92" rx="9" opacity=".6" transform="rotate(4 126 62)" />
        <rect x="80" y="20" width="80" height="92" rx="9" fill="var(--surface)" />
        <path d="M96 44 H144 M96 60 H144 M96 76 H128" opacity=".7" />
      </g>
    </svg>
  );
}

export function SubjectArt({ kind }: { kind: string }) {
  switch (kind) {
    case "atom":
      return <Atom />;
    case "flask":
      return <Flask />;
    case "dna":
      return <Dna />;
    case "sigma":
      return <Sigma />;
    default:
      return <Pages />;
  }
}
