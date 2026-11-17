import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const exists = (p) => fs.existsSync(path.join(root, p));

const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const R = (p, q, a) => Math.sqrt(p * p + q * q + 2 * p * q * Math.cos(rad(a)));
const TH = (p, q, a) => deg(Math.atan2(q * Math.sin(rad(a)), p + q * Math.cos(rad(a))));

let fails = 0;
let warns = 0;
let passes = 0;

const pass = () => {
  passes += 1;
};
const fail = (m) => {
  fails += 1;
  console.log("FAIL  " + m);
};
const warn = (m) => {
  warns += 1;
  console.log("warn  " + m);
};

const claims = [
  ["scalar-vector", "distance 6+8", 6 + 8, 0, "14", "=14"],
  ["scalar-vector", "displacement 6,8", Math.hypot(6, 8), 0, "10", "=10"],
  ["scalar-vector", "angle 8/6", deg(Math.atan(8 / 6)), 1, "53.1", "53.1"],
  ["scalar-vector", "runner distance", 3 + 4 + 3, 0, "10", "=10"],
  ["scalar-vector", "runner displacement", Math.hypot(0, 4), 0, "4", "=4"],
  ["scalar-vector", "semicircle path", 3.14 * 20, 1, "62.8", "62.8"],
  ["scalar-vector", "semicircle displacement", 2 * 20, 0, "40", "=40"],
  ["vector-types", "magnitude 3,4", Math.hypot(3, 4), 0, "5", "=5"],
  ["vector-types", "unit x", 3 / 5, 1, "0.6", "0.6"],
  ["vector-types", "unit y", 4 / 5, 1, "0.8", "0.8"],
  ["vector-types", "magnitude 2,-2,1", Math.hypot(2, -2, 1), 0, "3", "=3"],
  ["vector-types", "opposite scaled x", -0.6 * 5, 0, "-3", "-3"],
  ["vector-types", "opposite scaled y", -0.8 * 5, 0, "-4", "-4"],
  ["addition", "R 3,4 perpendicular", R(3, 4, 90), 0, "5", "sqrt{25}=5"],
  ["addition", "theta 3,4 perpendicular", TH(3, 4, 90), 1, "53.1", "=53.1"],
  ["addition", "R 5,8,60", R(5, 8, 60), 1, "11.4", "=11.4"],
  ["addition", "theta 5,8,60", TH(5, 8, 60), 1, "37.6", "=37.6"],
  ["addition", "R 5,12 perpendicular", R(5, 12, 90), 0, "13", "13 N"],
  ["addition", "equal forces 120 degrees", R(1, 1, 120), 2, "1.00"],
  ["addition", "angle for R=F", deg(Math.acos(-0.5)), 0, "120", "120"],
  ["subtraction", "|A-B| 2,3", Math.hypot(2, 3), 2, "3.61", "3.61"],
  ["subtraction", "|A|-|B|", Math.hypot(3, 5) - Math.hypot(1, 2), 2, "3.59", "3.59"],
  ["subtraction", "3,4 at 90", Math.sqrt(9 + 16), 0, "5", "= 5"],
  ["subtraction", "5,5 at 60", Math.sqrt(25 + 25 - 2 * 25 * Math.cos(rad(60))), 0, "5", "=5"],
  ["subtraction", "ball velocity change", 10 + 10, 0, "20", "=20"],
  ["unit-vector", "magnitude 2,-3,6", Math.hypot(2, -3, 6), 0, "7", "=7"],
  ["perpendicular-components", "Fx 10 at 30", 10 * Math.cos(rad(30)), 2, "8.66", "8.66"],
  ["perpendicular-components", "Fy 10 at 30", 10 * Math.sin(rad(30)), 0, "5", "=5"],
  ["perpendicular-components", "F from 8.66,5", Math.hypot(8.66, 5), 0, "10", "=10"],
  ["perpendicular-components", "angle 8/6", deg(Math.atan2(8, 6)), 1, "53.1", "53.1"],
  ["perpendicular-components", "20 at 60 x", 20 * Math.cos(rad(60)), 0, "10", "10 N"],
  ["perpendicular-components", "20 at 60 y", 20 * Math.sin(rad(60)), 1, "17.3", "17.3"],
  ["sine-rule-resolution", "P 100,30,60", (100 * Math.sin(rad(60))) / Math.sin(rad(90)), 1, "86.6", "86.6"],
  ["sine-rule-resolution", "Q 100,30,60", (100 * Math.sin(rad(30))) / Math.sin(rad(90)), 0, "50", "50"],
  ["sine-rule-resolution", "P 10,30,30", (10 * Math.sin(rad(30))) / Math.sin(rad(60)), 2, "5.77", "5.77"],
  ["sine-rule-resolution", "P 100,45,45", 100 * Math.sin(rad(45)), 1, "70.7", "70.7"],
  ["sine-rule-resolution", "perpendicular parts", 86.6 * 0.5, 1, "43.3", "43.3"],
  ["river-boat", "phi", deg(Math.acos(3 / 5)), 1, "53.1", "53.1"],
  ["river-boat", "straight time", 120 / Math.sqrt(25 - 9), 0, "30", "=30"],
  ["river-boat", "min time", 120 / 5, 0, "24", "=24"],
  ["river-boat", "drift", 3 * 24, 0, "72", "=72"],
  ["river-boat", "min time 100,4", 100 / 4, 0, "25", "25"],
  ["relative-velocity", "relative speed", Math.hypot(4, 3), 0, "5", "=5"],
  ["relative-velocity", "umbrella angle", deg(Math.atan(3 / 4)), 1, "36.9", "36.9"],
  ["relative-velocity", "train relative", 40 - 60, 0, "-20", "-20"],
  ["dot-product", "A.B 3,4 and 4,3", 3 * 4 + 4 * 3, 0, "24", "=24"],
  ["dot-product", "cos theta", 24 / 25, 2, "0.96", "0.96"],
  ["dot-product", "theta", deg(Math.acos(0.96)), 1, "16.3", "16.3"],
  ["dot-product", "C.D", 2 * 3 + 3 * -2, 0, "0", "=0"],
  ["dot-product", "A.A", 25, 0, "25", "25"],
  ["cross-product", "i component", 2 * 6 - 3 * 5, 0, "-3", "-3"],
  ["cross-product", "j component", -(1 * 6 - 3 * 4), 0, "6", "6"],
  ["cross-product", "k component", 1 * 5 - 2 * 4, 0, "-3", "-3"],
  ["cross-product", "magnitude", Math.sqrt(54), 2, "7.35", "7.35"],
  ["cross-product", "perpendicular check", 1 * -3 + 2 * 6 + 3 * -3, 0, "0", "=0"],
  ["cross-product", "area 2,3,30", 2 * 3 * Math.sin(rad(30)), 0, "3", "= 3"],
  ["del-gradient", "dx", 2 * 1 * -1 * 2, 0, "-4", "-4"],
  ["del-gradient", "dy", 1 * 1 * 2, 0, "2", "2"],
  ["del-gradient", "dz", 1 * 1 * -1, 0, "-1", "-1"],
  ["del-gradient", "magnitude", Math.sqrt(21), 2, "4.58", "4.58"],
  ["divergence", "at 1,1,1", 2 + 2 + 2, 0, "6", "=6"],
  ["curl", "at 1,1,1", -1, 0, "-1", "-"],
  ["vector-practice", "work", 6 * 4 + 8 * 3, 0, "48", "48 J"],
  ["vector-practice", "cos theta", 48 / (10 * 5), 2, "0.96", "0.96"],
  ["vector-practice", "theta", deg(Math.acos(0.96)), 1, "16.3", "16.3"],
  ["vector-practice", "max work", 10 * 5, 0, "50", "50 J"],
  ["vector-practice", "straight time", 120 / Math.sqrt(25 - 9), 0, "30", "30 s"],
  ["vector-practice", "min time", 120 / 5, 0, "24", "24 s"],
  ["vector-practice", "drift", 3 * 24, 0, "72", "72 m"],
  ["unit-vector", "2A-B magnitude", Math.sqrt(85), 2, "9.22", "9.22"],
  ["unit-vector", "x for magnitude 13", Math.sqrt(144), 0, "12", "144"],
  ["unit-vector", "unit y of 3,-4", -4 / 5, 1, "-0.8", "\u22120.8"],
  ["perpendicular-components", "Fx 50 at 30", 50 * Math.cos(rad(30)), 1, "43.3", "43.3"],
  ["perpendicular-components", "Fy 50 at 30", 50 * Math.sin(rad(30)), 0, "25", "25"],
  ["perpendicular-components", "Fx 20 at 45", 20 * Math.cos(rad(45)), 2, "14.14", "14.14"],
  ["perpendicular-components", "check 43.3,25", Math.hypot(43.3, 25), 0, "50", "50"],
  ["sine-rule-resolution", "P 120,30,90", (120 * Math.sin(rad(90))) / Math.sin(rad(120)), 1, "138.6", "138.6"],
  ["sine-rule-resolution", "Q 120,30,90", (120 * Math.sin(rad(30))) / Math.sin(rad(120)), 1, "69.3", "69.3"],
  ["sine-rule-resolution", "lantern 45", (100 * Math.sin(rad(45))) / Math.sin(rad(90)), 1, "70.7", "70.7"],
  ["river-boat", "river 100,2,4 time", 100 / Math.sqrt(12), 1, "28.9", "28.9"],
  ["river-boat", "river drift 2x25", 2 * 25, 0, "50", "=50"],
  ["river-boat", "river phi 0.5", deg(Math.acos(0.5)), 0, "60", "=60"],
  ["river-boat", "swimmer straight", 60 / 0.6, 0, "100", "=100"],
  ["river-boat", "swimmer drift", 0.8 * 60, 0, "48", "=48"],
  ["relative-velocity", "cyclist relative speed", Math.hypot(6, 8), 0, "10", "=10"],
  ["relative-velocity", "cyclist umbrella angle", deg(Math.atan(8 / 6)), 1, "53.1", "53.1"],
  ["relative-velocity", "opposite trains", 60 + 40, 0, "100", "100"],
  ["relative-velocity", "same direction trains", 60 - 40, 0, "20", "20"],
  ["dot-product", "3d dot product", 2 * 4 + 3 * -1 + 1 * 2, 0, "7", "=7"],
  ["dot-product", "3d cos theta", 7 / Math.sqrt(14 * 21), 2, "0.41", "0.41"],
  ["dot-product", "3d theta", deg(Math.acos(7 / Math.sqrt(14 * 21))), 1, "65.9", "65.9"],
  ["dot-product", "perpendicular m", 5 / 2, 1, "2.5", "2.5"],
  ["cross-product", "2d cross z", 2 * 5 - 3 * 4, 0, "-2", "=-2"],
  ["cross-product", "triangle cross i", (-2) * (-1) - 1 * 1, 0, "1", "=1"],
  ["cross-product", "triangle cross k", 3 * 1 - (-2) * 1, 0, "5", "=5"],
  ["cross-product", "triangle cross magnitude", Math.sqrt(42), 2, "6.48", "6.48"],
  ["cross-product", "triangle area", Math.sqrt(42) / 2, 2, "3.24", "3.24"],
  ["cross-product", "triangle perpendicular check", 3 * 1 + -2 * 4 + 1 * 5, 0, "0", "=0"],
  ["del-gradient", "gradient 3x2y dx", 6 * 1 * 2, 0, "12", "12"],
  ["del-gradient", "gradient 3x2y dy", 3 * 1 - 3 * 4, 0, "-9", "-9"],
  ["del-gradient", "gradient 3x2y magnitude", Math.hypot(12, 9), 0, "15", "=15"],
  ["del-gradient", "temperature gradient magnitude", Math.sqrt(15 * 15 + 7.5 * 7.5), 2, "16.77", "16.77"],
  ["del-gradient", "temperature gradient angle", deg(Math.atan(7.5 / 15)), 1, "26.6", "26.6"],
  ["divergence", "divergence 3x2 at 1", 6 * 1 + 3, 0, "9", "=9"],
  ["divergence", "divergence a", -1, 0, "-1", "=-1"],
  ["divergence", "divergence 2x,3y", 2 + 3, 0, "5", "5"],
  ["curl", "curl 3x minus -2y", 3 - -2, 0, "5", "=5"],
  ["curl", "curl b", 2, 0, "2", "b=2"],
  ["curl", "curl divergence", 4 - 1, 0, "3", "=3"],
];

const lessonFile = (lesson) => {
  const dirs = fs.readdirSync(path.join(root, "src/lessons"), { withFileTypes: true }).filter((d) => d.isDirectory());
  for (const d of dirs) {
    const p = `src/lessons/${d.name}/${lesson}.tsx`;
    if (exists(p)) return p;
  }
  return null;
};

for (const [lesson, label, value, digits, shown, needle] of claims) {
  const file = lessonFile(lesson);
  if (!file) {
    fail(`${lesson}: lesson file not found for claim "${label}"`);
    continue;
  }
  const got = value.toFixed(digits);
  if (Math.abs(Number(got) - Number(shown)) > 1e-9) {
    fail(`${lesson}: "${label}" computes to ${got}, claim says ${shown}`);
    continue;
  }
  if (needle && !read(file).includes(needle)) {
    fail(`${lesson}: "${label}" value ${shown} is right but text "${needle}" is not in the lesson`);
    continue;
  }
  pass();
}

const strings = (body) => body.match(/"(?:[^"\\]|\\.)*"/g) || [];

const checkLesson = (file) => {
  const name = path.basename(file, ".tsx");
  const src = read(file);

  if (src.includes("\u2014")) fail(`${name}: contains an em dash`);

  const quiz = [...src.matchAll(/options:\s*\[([\s\S]*?)\],\s*answer:\s*(\d+)/g)];
  const limit = name.endsWith("-practice") ? 12 : 5;
  if (quiz.length > limit) fail(`${name}: ${quiz.length} quiz items, limit is ${limit}`);
  for (const m of quiz) {
    const n = strings(m[1]).length;
    if (n < 2 || n > 5) fail(`${name}: a quiz item has ${n} options`);
    else if (Number(m[2]) >= n) fail(`${name}: quiz answer index ${m[2]} is outside ${n} options`);
    else pass();
  }

  const qs = [...src.matchAll(/\{\s*q:\s*"((?:[^"\\]|\\.)*)",\s*options:/g)].map((m) => m[1]);
  if (new Set(qs).size !== qs.length) fail(`${name}: duplicate quiz questions`);

  const a = src.indexOf("const steps");
  const b = src.indexOf("const figure");
  if (a >= 0 && b > a) {
    const region = src.slice(a, b);
    const titles = [...region.matchAll(/title:\s*(["`])((?:\\.|(?!\1)[^\\])*)\1/g)].map((m) => m[2]);
    if (new Set(titles).size !== titles.length) fail(`${name}: duplicate step titles`);
    for (const m of src.matchAll(/step:\s*(\d+)/g)) {
      const k = Number(m[1]);
      if (k < 1 || k > titles.length) fail(`${name}: formula points at step ${k} but the animation has ${titles.length} steps`);
      else pass();
    }
  }

  if (src.includes("think:")) {
    const levels = (src.match(/level:\s*"/g) || []).length;
    if (levels !== 3) fail(`${name}: ${levels} problems, expected 3`);
    if (!src.includes("look:")) warn(`${name}: no look line`);
    if (!src.includes("concepts:")) warn(`${name}: no concepts list`);
    if (!src.includes("problems:")) fail(`${name}: think without problems`);
  }

  src.split("\n").forEach((line, i) => {
    if (line.includes("\\\\") && /[\u09E6-\u09EF]/.test(line)) warn(`${name}:${i + 1}: Bengali digit in a line with LaTeX`);
  });
};

const walk = (dir) =>
  fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap((d) => {
    const p = `${dir}/${d.name}`;
    return d.isDirectory() ? walk(p) : [p];
  });

const lessonFiles = walk("src/lessons").filter((p) => p.endsWith(".tsx"));
for (const f of lessonFiles) checkLesson(f);

const indexes = fs.readdirSync(path.join(root, "src/data")).filter((f) => f.endsWith("-index.ts"));
for (const idx of indexes) {
  const chapter = idx.replace("-index.ts", "");
  const slugs = [...read(`src/data/${idx}`).matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  const dir = `src/lessons/${chapter}`;
  if (!exists(dir)) {
    fail(`${idx}: no folder ${dir}`);
    continue;
  }
  const reg = exists(`${dir}/index.ts`) ? read(`${dir}/index.ts`) : "";
  for (const s of slugs) {
    if (!exists(`${dir}/${s}.tsx`)) fail(`${chapter}: lesson file for "${s}" is missing`);
    else if (!reg.includes(`"${s}"`) && !new RegExp(`\\b${s.replace(/-/g, "")}\\b`, "i").test(reg.replace(/-/g, ""))) fail(`${chapter}: "${s}" is not registered in ${dir}/index.ts`);
    else pass();
  }
}

console.log(`\n${passes} checks passed, ${fails} failed, ${warns} warnings`);
process.exit(fails > 0 ? 1 : 0);
