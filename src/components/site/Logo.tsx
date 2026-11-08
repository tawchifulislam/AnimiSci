export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="60" height="60" rx="18" fill="#d93a21" stroke="#171a2c" strokeWidth="3" />
      <path d="M12 43 C19 15 28 15 33 33 S46 52 52 25" fill="none" stroke="#fffdf7" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M45.5 32 L52 23 L58 31.5" fill="none" stroke="#fffdf7" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="43" r="4.8" fill="#ffc83a" stroke="#171a2c" strokeWidth="2" />
    </svg>
  );
}

export function Logo({ size = 38 }: { size?: number }) {
  return (
    <span className="logo">
      <LogoMark size={size} />
      <span className="logo-word">
        Animi<b>Sci</b>
      </span>
    </span>
  );
}
