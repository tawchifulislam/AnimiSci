import { Atom, Dna, FlaskConical, Sigma } from "lucide-react";

export type StickerKind = "atom" | "flask" | "dna" | "sigma";

export function StickerIcon({ kind }: { kind: StickerKind }) {
  if (kind === "atom") return <Atom strokeWidth={2} aria-hidden />;
  if (kind === "flask") return <FlaskConical strokeWidth={2} aria-hidden />;
  if (kind === "dna") return <Dna strokeWidth={2} aria-hidden />;
  return <Sigma strokeWidth={2} aria-hidden />;
}
