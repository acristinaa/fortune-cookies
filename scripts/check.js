const fs = require("fs");
const path = require("path");

const changed = process.argv.slice(2).filter(Boolean);
const author = (process.env.PR_AUTHOR || "").toLowerCase();
const errors = [];

if (changed.length === 0) errors.push("This pull request doesn't add or change any files.");

for (const file of changed) {
  if (!file.startsWith("fortunes/")) {
    errors.push(`"${file}" is outside the fortunes/ folder. Please only add your own fortune file.`);
    continue;
  }
  if (!fs.existsSync(file)) continue;

  const name = path.basename(file);
  if (!/^[A-Za-z0-9-]+\.json$/.test(name)) {
    errors.push(`"${name}" should be named like your-github-username.json (letters, numbers, dashes).`);
    continue;
  }
  if (author && path.basename(name, ".json").toLowerCase() !== author) {
    errors.push(`"${name}" should be named after your GitHub username: ${author}.json`);
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    errors.push(`"${name}" isn't valid JSON. Check quotes and commas. (${e.message})`);
    continue;
  }

  const allowed = ["fortune", "emoji"];
  for (const key of Object.keys(data)) {
    if (!allowed.includes(key)) errors.push(`"${name}" has an unknown field "${key}". Use only: ${allowed.join(", ")}.`);
  }
  if (typeof data.fortune !== "string" || !data.fortune.trim()) {
    errors.push(`"${name}" needs a "fortune" with some text.`);
  } else if (data.fortune.length > 140) {
    errors.push(`"${name}": the fortune is ${data.fortune.length} characters. Keep it to 140 or less.`);
  }
  if (data.emoji !== undefined && (typeof data.emoji !== "string" || [...data.emoji].length > 4)) {
    errors.push(`"${name}": "emoji" should be a single emoji.`);
  }
}

if (errors.length) {
  console.log("🥠 Almost there! Please fix:\n");
  errors.forEach((e) => console.log("  ✗ " + e));
  process.exit(1);
}
console.log("🥠 Looks great! Your fortune is ready to be baked.");