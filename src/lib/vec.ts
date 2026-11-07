export const rad = (d: number) => (d * Math.PI) / 180;
export const deg = (r: number) => (r * 180) / Math.PI;
export const f1 = (n: number) => (Math.round(n * 10) / 10).toString();
export const f2 = (n: number) => (Math.round(n * 100) / 100).toString();
export const bn = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

export function resultant(p: number, q: number, alphaDeg: number) {
  const a = rad(alphaDeg);
  const r = Math.sqrt(p * p + q * q + 2 * p * q * Math.cos(a));
  const theta = deg(Math.atan2(q * Math.sin(a), p + q * Math.cos(a)));
  const gamma = alphaDeg - theta;
  return { r, theta, gamma };
}

export function arcPath(cx: number, cy: number, radius: number, fromDeg: number, toDeg: number) {
  const x1 = cx + radius * Math.cos(rad(fromDeg));
  const y1 = cy - radius * Math.sin(rad(fromDeg));
  const x2 = cx + radius * Math.cos(rad(toDeg));
  const y2 = cy - radius * Math.sin(rad(toDeg));
  const sweep = toDeg >= fromDeg ? 0 : 1;
  return `M ${x1} ${y1} A ${radius} ${radius} 0 0 ${sweep} ${x2} ${y2}`;
}
