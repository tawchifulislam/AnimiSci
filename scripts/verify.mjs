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
  ["relative-velocity", "train relative", 40 - 60, 0, "-20", "\u221220"],
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
  ["addition", "guided R 6,4,60", R(6, 4, 60), 2, "8.72", "8.72"],
  ["addition", "guided theta 6,4,60", TH(6, 4, 60), 1, "23.4", "23.4"],
  ["addition", "guided R 6,4,90", R(6, 4, 90), 2, "7.21", "7.21"],
  ["addition", "guided same direction", 6 + 4, 0, "10", "10 N"],
  ["addition", "guided opposite", 6 - 4, 0, "2", "2 N"],
  ["subtraction", "guided subtraction 5,3,90", Math.sqrt(34), 2, "5.83", "5.83"],
  ["subtraction", "guided same direction", 5 - 3, 0, "2", "5 \u2212 3 = 2"],
  ["subtraction", "guided opposite direction", 5 + 3, 0, "8", "5 + 3 = 8"],
  ["subtraction", "guided walk back", 5 - 2, 0, "3", "5 \u2212 2 = 3"],
  ["unit-vector", "guided sum x", 3 + 2, 0, "5", "5î + 5ĵ"],
  ["dot-product", "guided dot work", 40 * 20 * Math.cos(rad(60)), 0, "400", "400 J"],
  ["dot-product", "guided cart share", 40 * Math.cos(rad(60)), 0, "20", "20 N"],
  ["cross-product", "guided wrench torque", 0.3 * 50, 0, "15", "15 N"],
  ["gas-variables", "gas 27C to K", 27 + 273, 0, "300", "300 K"],
  ["gas-variables", "gas doubled temp C", 600 - 273, 0, "327", "327"],
  ["boyle", "boyle P at 4L", 12 / 4, 0, "3", "3 atm"],
  ["boyle", "boyle P2", (2 * 6) / 3, 0, "4", "4 atm"],
  ["boyle", "boyle V2", (1 * 10) / 4, 1, "2.5", "2.5 L"],
  ["boyle", "boyle balloons", (3 * 4 - 4) / 2, 0, "4", "4টি"],
  ["charles-pressure", "charles V2", (6 / 300) * 450, 0, "9", "9 L"],
  ["charles-pressure", "pressure law 600K", (2 / 300) * 600, 0, "4", "4 atm"],
  ["charles-pressure", "pressure law 400K", (2 * 400) / 300, 2, "2.67", "2.67 atm"],
  ["charles-pressure", "charles T2", (300 * 6) / 5, 0, "360", "360 K"],
  ["ideal-gas-eq", "ideal eq 2 mol", (2 * 8.314 * 300) / 0.05, 0, "99768", "99768"],
  ["ideal-gas-eq", "ideal eq moles", (101325 * 0.005) / (8.314 * 300), 3, "0.203", "0.203"],
  ["ideal-gas-eq", "ideal eq litres", ((0.5 * 8.314 * 400) / 200000) * 1000, 3, "8.314", "8.314 L"],
  ["ideal-gas-eq", "ideal eq STP", ((8.314 * 273) / 101325) * 1000, 1, "22.4", "22.4 L"],
  ["real-gas", "real ideal pressure", 0.0821 * 300, 1, "24.6", "24.6 atm"],
  ["real-gas", "real vdw pressure", (0.0821 * 300) / (1 - 0.0427) - 3.64, 1, "22.1", "22.1 atm"],
  ["real-gas", "real percent", ((0.0821 * 300 - ((0.0821 * 300) / (1 - 0.0427) - 3.64)) / ((0.0821 * 300) / (1 - 0.0427) - 3.64)) * 100, 1, "11.5", "11.5%"],
  ["real-gas", "real Z 300K 100atm", 1 + (0.0427 - 3.64 / (0.0821 * 300)) * (100 / (0.0821 * 300)), 2, "0.57", "0.57"],
  ["kinetic-pressure", "kinetic P 1.2", (1 / 3) * 1.2 * 250000, 0, "100000", "100000 Pa"],
  ["kinetic-pressure", "kinetic P 1.29", (1 / 3) * 1.29 * 250000, 0, "107500", "107500 Pa"],
  ["kinetic-pressure", "kinetic hydrogen crms", Math.sqrt((3 * 101000) / 0.09), 0, "1835", "1835 m/s"],
  ["kinetic-pressure", "kinetic fourfold", 4 * 100000, 0, "400000", "400000 Pa"],
  ["kinetic-temperature", "kinetic KE", (1.5 * 1.38 * 300) / 100, 2, "6.21", "6.21"],
  ["kinetic-temperature", "kinetic O2 crms", Math.sqrt((3 * 8.314 * 300) / 0.032), 0, "484", "484 m/s"],
  ["kinetic-temperature", "kinetic N2 crms", Math.sqrt((3 * 8.314 * 300) / 0.028), 0, "517", "517 m/s"],
  ["kinetic-temperature", "kinetic N2 1200K", Math.sqrt((3 * 8.314 * 1200) / 0.028), 0, "1034", "1034 m/s"],
  ["equipartition", "equipartition He 2 mol", 1.5 * 2 * 8.314 * 300, 0, "7483", "7483 J"],
  ["equipartition", "equipartition He 400K", 1.5 * 8.314 * 400, 0, "4988", "4988 J"],
  ["equipartition", "equipartition N2 400K", 2.5 * 8.314 * 400, 0, "8314", "8314 J"],
  ["equipartition", "equipartition H2O 2 mol", 3 * 2 * 8.314 * 400, 0, "19954", "19954 J"],
  ["humidity", "humidity RH", (1.71 / 2.34) * 100, 0, "73", "73%"],
  ["humidity", "humidity vapour pressure", 0.5 * 4.24, 2, "2.12", "2.12 kPa"],
  ["humidity", "humidity dew point", 15 + ((2.12 - 1.71) / (2.34 - 1.71)) * 5, 0, "18", "18°C"],
  ["humidity", "humidity glass", 0.4 * 4.24, 2, "1.70", "1.70 kPa"],
  ["gas-practice", "practice pressure", (2 * 8.314 * 300) / 0.005, 0, "997680", "997680 Pa"],
  ["gas-practice", "practice heated pressure", ((2 * 8.314 * 300) / 0.005) * (400 / 300), 0, "1330240", "1330240 Pa"],
  ["gas-practice", "practice vapour pressure", 0.6 * 4.24, 2, "2.54", "2.54 kPa"],
  ["gas-practice", "practice dew point", 20 + ((2.544 - 2.34) / (3.17 - 2.34)) * 5, 0, "21", "21°C"],
  ["gas-graphs", "graphs P at V 4", 12 / 4, 0, "3", "3 atm"],
  ["gas-graphs", "graphs slope", 3 / 0.25, 0, "12", "12 atm"],
  ["gas-graphs", "graphs P at V 2", 12 * 0.5, 0, "6", "6 atm"],
  ["gas-graphs", "graphs P at V 6", (3 * 4) / 6, 0, "2", "2 atm"],
  ["gas-graphs", "graphs V at 200K", (6 / 300) * 200, 0, "4", "4 L"],
  ["temperature-measurement", "thermo K from C", 27 + 273, 0, "300", "300 K"],
  ["temperature-measurement", "thermo F body", (9 / 5) * 37 + 32, 1, "98.6", "98.6°F"],
  ["temperature-measurement", "thermo F of 50C", (9 / 5) * 50 + 32, 0, "122", "122°F"],
  ["system-state", "thermo molar volume", 0.0821 * 300, 1, "24.6", "24.6 L"],
  ["heat-work", "thermo W isobaric", 2e5 * 2e-3, 0, "400", "400 J"],
  ["heat-work", "thermo W 1200", 3e5 * 4e-3, 0, "1200", "1200 J"],
  ["first-law", "thermo dU", 500 - 200, 0, "300", "300 J"],
  ["first-law", "thermo adiabatic", 0 - 150, 0, "-150", "−150 J"],
  ["specific-heats", "thermo Cv mono", 1.5 * 8.314, 1, "12.5", "12.5 J"],
  ["specific-heats", "thermo Qv", 2 * 1.5 * 8.314 * 10, 0, "249", "249 J"],
  ["specific-heats", "thermo Qp", 2 * 2.5 * 8.314 * 10, 0, "416", "416 J"],
  ["specific-heats", "thermo extra", 2 * 8.314 * 10, 0, "166", "166 J"],
  ["specific-heats", "thermo gamma mono", 5 / 3, 2, "1.67", "1.67"],
  ["processes", "thermo iso work", 8.314 * 300 * 0.693, 0, "1728", "1728 J"],
  ["adiabatic", "thermo P2 adi", 4 * Math.pow(0.5, 1.4), 2, "1.52", "1.52 atm"],
  ["adiabatic", "thermo T2 adi", 300 * Math.pow(0.5, 0.4), 0, "227", "227 K"],
  ["adiabatic", "thermo T diesel", 300 * Math.pow(8, 2 / 3), 0, "1200", "1200 K"],
  ["second-law", "thermo W engine", 1000 - 600, 0, "400", "400 J"],
  ["second-law", "thermo Q1", 500 / 0.25, 0, "2000", "2000 J"],
  ["carnot", "thermo carnot eff", (1 - 300 / 600) * 100, 0, "50", "50%"],
  ["carnot", "thermo carnot W", 0.5 * 2000, 0, "1000", "1000 J"],
  ["carnot", "thermo carnot eff 900", (1 - 300 / 900) * 100, 1, "66.7", "66.7%"],
  ["carnot", "thermo carnot 500K", (1 - 300 / 500) * 100, 0, "40", "40%"],
  ["carnot", "thermo carnot Q2", 1000 - 400, 0, "600", "600 J"],
  ["refrigerator", "thermo COP", 900 / 100, 0, "9", "COP = 9"],
  ["refrigerator", "thermo Q1 fridge", 900 + 100, 0, "1000", "1000 J"],
  ["refrigerator", "thermo heat pump", 300 / 30, 0, "10", "10"],
  ["refrigerator", "thermo Q2 fridge", 9 * 200, 0, "1800", "1800 J"],
  ["entropy", "thermo dS", 600 / 300, 0, "2", "2 J/K"],
  ["entropy", "thermo dS ice", 334000 / 273, 0, "1223", "1223 J/K"],
  ["entropy", "thermo dS net", 1200 / 300 - 1200 / 400, 0, "1", "+1 J/K"],
  ["thermo-practice", "thermo practice Q2", 1000 - 0.4 * 1000, 0, "600", "600 J"],
  ["thermo-practice", "thermo practice W", 0.4 * 1000, 0, "400", "400 J"],
  ["thermo-practice", "thermo practice cop", 270 / 30, 0, "9", "COP = 9"],
  ["thermo-practice", "thermo practice Q1", 9 * 200 + 200, 0, "2000", "2000 J"],
  ["stress-strain", "matter stress", 100 / 1e-6, 0, "100000000", "10^8 Pa"],
  ["stress-strain", "matter strain", 1e8 / 2e11, 4, "0.0005", "0.0005"],
  ["stress-strain", "matter dl", 0.0005 * 2 * 1000, 0, "1", "1 mm"],
  ["stress-strain", "matter dl thick", (0.0005 * 2 * 1000) / 2, 1, "0.5", "0.5 mm"],
  ["stress-strain", "matter stress 2", 300 / 1.5e-6, 0, "200000000", "2 × 10^8 Pa"],
  ["stress-strain", "matter dl hard", (400 / 2e-6 / 2e11) * 3 * 1000, 0, "3", "3 mm"],
  ["hooke-graph", "matter spring F", 500 * 0.04, 0, "20", "20 N"],
  ["hooke-graph", "matter spring k", 30 / 0.06, 0, "500", "500 N/m"],
  ["elastic-moduli", "matter bulk strain", (1.1e7 / 2.2e9) * 100, 1, "0.5", "0.5%"],
  ["elastic-moduli", "matter bulk dV", 0.005 * 2 * 1000, 0, "10", "10 mL"],
  ["elastic-moduli", "matter shear", 500 / 0.01 / 0.001, 0, "50000000", "5 × 10^7 Pa"],
  ["elastic-moduli", "matter poisson", 0.0006 / 0.002, 1, "0.3", "0.3"],
  ["elastic-energy", "matter U wire", 0.5 * 100 * 0.001, 2, "0.05", "0.05 J"],
  ["elastic-energy", "matter U spring", 0.5 * 500 * 0.04 * 0.04, 1, "0.4", "0.4 J"],
  ["elastic-energy", "matter U spring 2", 0.5 * 500 * 0.08 * 0.08, 1, "1.6", "1.6 J"],
  ["elastic-energy", "matter density", 0.5 * 1e8 * 0.0005, 0, "25000", "2.5 × 10^4 J/m³"],
  ["surface-tension", "matter ST film", 0.0036 / (2 * 0.05), 3, "0.036", "0.036 N/m"],
  ["surface-tension", "matter bubble", (4 * 0.025) / 0.01, 0, "10", "10 Pa"],
  ["surface-tension", "matter drop", (2 * 0.025) / 0.01, 0, "5", "5 Pa"],
  ["surface-tension", "matter film work", 0.025 * 0.004, 4, "0.0001", "1 × 10^-4 J"],
  ["capillary", "matter water h", ((2 * 0.072) / (1000 * 9.8 * 5e-4)) * 100, 1, "2.9", "2.9 cm"],
  ["capillary", "matter water h half", ((2 * 0.072) / (1000 * 9.8 * 2.5e-4)) * 100, 1, "5.9", "5.9 cm"],
  ["capillary", "matter mercury h", Math.abs((2 * 0.465 * -0.766) / (13600 * 9.8 * 5e-4)) * 100, 1, "1.1", "1.1 cm"],
  ["viscosity", "matter vt", ((2 * 1e-6 * (7800 - 900) * 9.8) / (9 * 0.5)) * 100, 1, "3.0", "3.0 cm/s"],
  ["viscosity", "matter vt double r", 4 * ((2 * 1e-6 * (7800 - 900) * 9.8) / (9 * 0.5)) * 100, 1, "12.0", "12.0 cm/s"],
  ["continuity", "matter v2", Math.pow(4 / 2, 2) * 1, 0, "4", "4 m/s"],
  ["continuity", "matter v nozzle", Math.pow(6 / 2, 2) * 0.5, 1, "4.5", "4.5 m/s"],
  ["continuity", "matter Q", 3.14 * 0.02 * 0.02 * 1000, 2, "1.26", "1.26 L/s"],
  ["bernoulli", "matter dP", 0.5 * 1000 * (16 - 1), 0, "7500", "7500 Pa"],
  ["bernoulli", "matter dP 2", 0.5 * 1000 * (36 - 4), 0, "16000", "16000 Pa"],
  ["bernoulli", "matter torricelli", Math.sqrt(2 * 9.8 * 5), 1, "9.9", "9.9 m/s"],
  ["matter-practice", "matter practice dl", ((100 / 1e-6 / 2e11) * 2) * 1000, 0, "1", "1 mm"],
  ["matter-practice", "matter practice U", 0.5 * 100 * 0.001, 2, "0.05", "0.05 J"],
  ["matter-practice", "matter practice water", ((2 * 0.072) / (1000 * 9.8 * 5e-4)) * 100, 1, "2.9", "2.9 cm"],
  ["matter-practice", "matter practice mercury", Math.abs((2 * 0.465 * -0.766) / (13600 * 9.8 * 5e-4)) * 100, 1, "1.1", "1.1 cm"],
  ["surface-energy", "matter bubble work", 0.025 * 2 * 4 * Math.PI * 0.02 * 0.02, 5, "0.00025", "2.5 × 10^-4 J"],
  ["surface-energy", "matter drop split", 0.072 * 4 * Math.PI * 1e-6 * 9, 7, "0.0000081", "8.1 × 10^-6 J"],
  ["surface-energy", "matter film area work", 0.072 * 0.01, 5, "0.00072", "7.2 × 10^-4 J"],
  ["moduli-relations", "matter Y from K", (3 * 1e11 * (1 - 2 * 0.25)) / 1e11, 1, "1.5", "1.5 × 10^11 Pa"],
  ["moduli-relations", "matter eta", 1.5e11 / (2 * 1.25) / 1e10, 0, "6", "6 × 10^10 Pa"],
  ["moduli-relations", "matter eta steel", 2e11 / (2 * 1.3) / 1e10, 1, "7.7", "7.7 × 10^10 Pa"],
  ["work", "energy work 20N", 20 * 5, 0, "100", "100 J"],
  ["work", "energy work 60deg", 50 * 10 * 0.5, 0, "250", "250 J"],
  ["work", "energy friction", 10 * 3 * -1, 0, "-30", "−30 J"],
  ["work", "energy work simple", 30 * 4, 0, "120", "120 J"],
  ["work", "energy work 30deg", 100 * 6 * 0.866, 0, "520", "520 J"],
  ["work", "energy lift", 5 * 9.8 * 2, 0, "98", "98 J"],
  ["variable-force", "energy rect", 10 * 5, 0, "50", "50 J"],
  ["variable-force", "energy tri", 0.5 * 5 * 10, 0, "25", "25 J"],
  ["variable-force", "energy spring", 0.5 * 200 * 0.2 * 0.2, 0, "4", "4 J"],
  ["variable-force", "energy spring 2", 0.5 * 200 * (0.4 * 0.4 - 0.2 * 0.2), 0, "12", "12 J"],
  ["variable-force", "energy spring 500", 0.5 * 500 * 0.01, 1, "2.5", "2.5 J"],
  ["work-energy-theorem", "energy KE", 0.5 * 2 * 9, 0, "9", "9 J"],
  ["work-energy-theorem", "energy KE double", 0.5 * 2 * 36, 0, "36", "36 J"],
  ["work-energy-theorem", "energy v from work", Math.sqrt(40), 1, "6.3", "6.3 m/s"],
  ["work-energy-theorem", "energy car KE", 0.5 * 1000 * 400, 0, "200000", "200000 J"],
  ["work-energy-theorem", "energy stop dist", 200000 / 5000, 0, "40", "40 m"],
  ["work-energy-theorem", "energy dKE", 0.5 * 2 * (25 - 9), 0, "16", "16 J"],
  ["work-energy-theorem", "energy car work", 0.5 * 1000 * (900 - 100), 0, "400000", "400000 J"],
  ["potential-energy", "energy PE", 2 * 9.8 * 5, 0, "98", "98 J"],
  ["potential-energy", "energy PE 3kg", 3 * 9.8 * 10, 0, "294", "294 J"],
  ["potential-energy", "energy PE water", 1000 * 9.8 * 20, 0, "196000", "196000 J"],
  ["potential-energy", "energy spring 8", 0.5 * 400 * 0.04, 0, "8", "8 J"],
  ["potential-energy", "energy gravity work", 2 * 9.8 * 3, 1, "58.8", "58.8 J"],
  ["conservative-forces", "energy friction work", 0.2 * 5 * 9.8 * 10, 0, "98", "98 J"],
  ["conservative-forces", "energy friction curved", 0.2 * 5 * 9.8 * 14, 1, "137.2", "137.2 J"],
  ["energy-conservation", "energy mid KE", 1 * 9.8 * 10, 0, "98", "98 J"],
  ["energy-conservation", "energy v 20m", Math.sqrt(2 * 9.8 * 20), 1, "19.8", "19.8 m/s"],
  ["energy-conservation", "energy pendulum", Math.sqrt(2 * 9.8 * 0.8), 1, "4.0", "4.0 m/s"],
  ["energy-conservation", "energy friction KE", 2 * 9.8 * 5 - 20, 0, "78", "78 J"],
  ["energy-conservation", "energy v 10m", Math.sqrt(2 * 9.8 * 10), 0, "14", "14 m/s"],
  ["energy-conservation", "energy v 5m", Math.sqrt(2 * 9.8 * 5), 1, "9.9", "9.9 m/s"],
  ["energy-conservation", "energy max h", 400 / (2 * 9.8), 1, "20.4", "20.4 m"],
  ["power", "energy crane", (500 * 9.8 * 10) / 20, 0, "2450", "2450 W"],
  ["power", "energy car power", (2000 * 20) / 1000, 0, "40", "40 kW"],
  ["power", "energy hp", 7460 / 746, 0, "10", "10 hp"],
  ["power", "energy kWh", 2 * 3, 0, "6", "6 kWh"],
  ["power", "energy P simple", 600 / 5, 0, "120", "120 W"],
  ["power", "energy P stairs", (60 * 9.8 * 4) / 5, 0, "470", "470 W"],
  ["power", "energy pump", 1500 / (9.8 * 20), 1, "7.7", "7.7 kg/s"],
  ["efficiency", "energy eff motor", (1500 / 2000) * 100, 0, "75", "75%"],
  ["efficiency", "energy eff bulb", (3 / 60) * 100, 0, "5", "5%"],
  ["efficiency", "energy eff chain", 0.9 * 0.8 * 100, 0, "72", "72%"],
  ["efficiency", "energy eff 80", (800 / 1000) * 100, 0, "80", "80%"],
  ["efficiency", "energy eff input", 4 / 0.8, 0, "5", "5 kW"],
  ["efficiency", "energy eff plant", 0.4 * 0.9 * 0.95 * 100, 1, "34.2", "34.2%"],
  ["mass-energy", "energy 1g", (1e-3 * 9e16) / 1e13, 0, "9", "9 × 10^13 J"],
  ["mass-energy", "energy coal", 9e13 / 3e7 / 1e6, 0, "3", "3 × 10^6 kg"],
  ["mass-energy", "energy 2g", (2e-3 * 9e16) / 1e14, 1, "1.8", "1.8 × 10^14 J"],
  ["mass-energy", "energy mass", 4.5e16 / 9e16, 1, "0.5", "0.5 kg"],
  ["mass-energy", "energy sun", (4e9 * 9e16) / 1e26, 1, "3.6", "3.6 × 10^26 W"],
  ["energy-practice", "energy practice work", 50 * 10 * 0.5, 0, "250", "250 J"],
  ["energy-practice", "energy practice friction", 20 * 10, 0, "200", "200 J"],
  ["energy-practice", "energy practice net", 250 - 200, 0, "50", "50 J"],
  ["energy-practice", "energy practice v", Math.sqrt(50), 1, "7.1", "7.1 m/s"],
  ["energy-practice", "energy practice useful", 500 * 9.8 * 10, 0, "49000", "49000 J"],
  ["energy-practice", "energy practice Pout", (500 * 9.8 * 10) / 20, 0, "2450", "2450 W"],
  ["energy-practice", "energy practice Pin", 2450 / 0.7, 0, "3500", "3500 W"],
  ["rutherford", "atom ratio", 1e-10 / 1e-15, 0, "100000", "10^5 গুণ"],
  ["rutherford", "atom r0 5MeV", (1.44 * 2 * 79) / 5, 1, "45.5", "45.5 fm"],
  ["rutherford", "atom r0 7.7MeV", (1.44 * 2 * 79) / 7.7, 1, "29.5", "29.5 fm"],
  ["rutherford", "atom r0 10MeV", (1.44 * 2 * 79) / 10, 1, "22.8", "22.8 fm"],
  ["bohr-model", "atom r2", 0.529 * 4, 2, "2.12", "2.12 Å"],
  ["bohr-model", "atom r3", 0.529 * 9, 2, "4.76", "4.76 Å"],
  ["bohr-model", "atom r5", 0.529 * 25, 1, "13.2", "13.2 Å"],
  ["bohr-model", "atom v3", 2.19e6 / 3 / 1e5, 1, "7.3", "7.3 × 10^5 m/s"],
  ["bohr-model", "atom v5", 2.19e6 / 5 / 1e5, 1, "4.4", "4.4 × 10^5 m/s"],
  ["hydrogen-energy", "atom E2", -13.6 / 4, 1, "-3.4", "−3.4 eV"],
  ["hydrogen-energy", "atom dE 3to2", 3.4 - 13.6 / 9, 2, "1.89", "1.89 eV"],
  ["hydrogen-energy", "atom lambda red", 1240 / (3.4 - 13.6 / 9), 0, "656", "656 nm"],
  ["hydrogen-energy", "atom E4", 13.6 / 16, 2, "0.85", "0.85 eV"],
  ["hydrogen-energy", "atom dE 2to1", 13.6 - 3.4, 1, "10.2", "10.2 eV"],
  ["hydrogen-energy", "atom lambda UV", 1240 / 10.2, 0, "122", "122 nm"],
  ["hydrogen-energy", "atom 1to3", 13.6 - 13.6 / 9, 2, "12.09", "12.09 eV"],
  ["spectral-series", "atom balmer1", 1e9 / (1.097e7 * (1 / 4 - 1 / 9)), 0, "656", "656 nm"],
  ["spectral-series", "atom balmer2", 1e9 / (1.097e7 * (1 / 4 - 1 / 16)), 0, "486", "486 nm"],
  ["spectral-series", "atom lyman1", 1e9 / (1.097e7 * 0.75), 0, "122", "122 nm"],
  ["spectral-series", "atom paschen1", 1e9 / (1.097e7 * (1 / 9 - 1 / 16)), 0, "1875", "1875 nm"],
  ["spectral-series", "atom balmer limit", 1e9 / (1.097e7 / 4), 0, "365", "365 nm"],
  ["nucleus", "atom neutrons", 238 - 92, 0, "146", "146"],
  ["nucleus", "atom R64", 1.2 * 4, 1, "4.8", "4.8 fm"],
  ["nucleus", "atom R8", 1.2 * 2, 1, "2.4", "2.4 fm"],
  ["nucleus", "atom density", 1.66e-27 / ((4 / 3) * Math.PI * Math.pow(1.2e-15, 3)) / 1e17, 1, "2.3", "2.3 × 10^17 kg/m³"],
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
    if (!src.includes("look:") && !src.includes("guided: true")) warn(`${name}: no look line`);
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
