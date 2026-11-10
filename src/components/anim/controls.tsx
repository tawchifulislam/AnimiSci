"use client";

export function Chips<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label?: string;
  value: T;
  options: { key: T; name: string }[];
  onChange: (key: T) => void;
}) {
  return (
    <div className="chips" role="group" aria-label={label}>
      {label ? <span className="chips-label">{label}</span> : null}
      {options.map((o) => (
        <button key={String(o.key)} type="button" className="chip" aria-pressed={o.key === value} onClick={() => onChange(o.key)}>
          {o.name}
        </button>
      ))}
    </div>
  );
}
