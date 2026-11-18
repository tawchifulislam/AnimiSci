import { Tex } from "@/components/ui/Tex";

const items = [
  { tex: "F=ma", tint: "#9ccbff" },
  { tex: "\\mathrm{pH}=-\\log[\\mathrm{H}^+]", tint: "#8be6bb" },
  { tex: "\\sin^2\\theta+\\cos^2\\theta=1", tint: "#ffe27a" },
  { tex: "E=mc^2", tint: "#9ccbff" },
  { tex: "6\\mathrm{CO_2}+6\\mathrm{H_2O}\\to\\mathrm{C_6H_{12}O_6}+6\\mathrm{O_2}", tint: "#e9ccff" },
  { tex: "PV=nRT", tint: "#8be6bb" },
  { tex: "e^{i\\pi}+1=0", tint: "#ffe27a" },
  { tex: "R=\\sqrt{P^2+Q^2+2PQ\\cos\\alpha}", tint: "#9ccbff" },
  { tex: "\\mathrm{DNA}\\to\\mathrm{RNA}\\to\\mathrm{Protein}", tint: "#e9ccff" },
  { tex: "V=IR", tint: "#9ccbff" },
  { tex: "\\frac{d}{dx}x^n=nx^{n-1}", tint: "#ffe27a" },
  { tex: "\\Delta U=Q-W", tint: "#9ccbff" },
];

function Group({ hidden }: { hidden?: boolean }) {
  return (
    <div className="sx-mq-group" aria-hidden={hidden}>
      {items.map((it) => (
        <span key={it.tex} className="sx-mq-item">
          <span className="sx-fchip" style={{ background: it.tint }}>
            <Tex>{it.tex}</Tex>
          </span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="sx-mq" role="presentation">
      <div className="sx-mq-track">
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
