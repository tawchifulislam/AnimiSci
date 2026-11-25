export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo.svg" alt="" height={size} width={Math.round(size * 0.89)} />
  );
}

export function Logo({ size = 30 }: { size?: number }) {
  return (
    <span className="logo">
      <LogoMark size={size} />
      <span className="logo-word">
        animi<span className="logo-sci">sci</span>
      </span>
    </span>
  );
}
