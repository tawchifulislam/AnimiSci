export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="animisci-lg" x1="8" y1="2" x2="56" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6577ff" />
          <stop offset="1" stopColor="#2f3fc9" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="17" fill="url(#animisci-lg)" />
      <path d="M17 47 L32 17 L47 47 M24 36 H40" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="47" cy="17" r="5" fill="#ffc247" />
    </svg>
  );
}

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <span className="logo">
      <LogoMark size={size} />
      <span className="logo-word">
        Animi<b>Sci</b>
      </span>
    </span>
  );
}
