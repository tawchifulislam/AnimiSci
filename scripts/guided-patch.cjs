const fs = require("fs");
const [target, template] = process.argv.slice(2);
if (!target || !template || !fs.existsSync(target) || !fs.existsSync(template)) {
  console.log("missing file: " + target + " / " + template);
  process.exit(1);
}
const s = fs.readFileSync(target, "utf8");
const start = s.indexOf("export const meta: LessonMeta = {");
if (start < 0) {
  console.log("meta not found in " + target);
  process.exit(1);
}
const end = s.indexOf("\n};\n", start);
if (end < 0) {
  console.log("meta end not found in " + target);
  process.exit(1);
}
let meta = s.slice(start, end + 4);
if (!meta.includes("guided: true")) {
  meta = meta.replace("export const meta: LessonMeta = {\n", () => "export const meta: LessonMeta = {\n  guided: true,\n");
}
const t = fs.readFileSync(template, "utf8");
fs.writeFileSync(target, t.replace("__META__\n", () => meta));
console.log("updated: " + target);
