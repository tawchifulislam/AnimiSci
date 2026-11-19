export function Avatar({ name, src, size = 36 }: { name: string; src?: string | null; size?: number }) {
  const initial = Array.from(name.trim())[0] ?? "?";
  return (
    <span className="sx-avatar" style={{ width: size, height: size, fontSize: size * 0.42 }}>
      {src ? <img src={src} alt="" referrerPolicy="no-referrer" /> : initial}
    </span>
  );
}
