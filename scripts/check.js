const fs = require("fs");
const path = require("path");

const changed = process.argv.slice(2).filter(Boolean);
const author = (process.env.PR_AUTHOR || "").toLowerCase();
const errors = [];
const MAX_TEXT = 200;

if (changed.length === 0)
  errors.push("This pull request doesn't add or change any files.");
if (changed.length > 1)
  errors.push(
    `You changed ${changed.length} files. Please add only ONE file: fortunes/your-github-username.json`,
  );

for (const file of changed) {
  if (!file.startsWith("fortunes/")) {
    errors.push(
      `"${file}" is outside the fortunes/ folder. Please only add your own file inside fortunes/.`,
    );
    continue;
  }
  if (!fs.existsSync(file)) continue;

  const name = path.basename(file);
  if (!/^[A-Za-z0-9-]+\.json$/.test(name)) {
    errors.push(
      `"${name}" should be named like your-github-username.json (letters, numbers, dashes).`,
    );
    continue;
  }
  if (author && path.basename(name, ".json").toLowerCase() !== author) {
    errors.push(
      `"${name}" should be named after your GitHub username: ${author}.json`,
    );
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    errors.push(
      `"${name}" isn't valid JSON. Check quotes and commas. (${e.message})`,
    );
    continue;
  }
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    errors.push(
      `"${name}" should be one object that starts with { and ends with }.`,
    );
    continue;
  }

  const allowed = ["type", "text", "author", "emoji"];
  for (const key of Object.keys(data)) {
    if (!allowed.includes(key))
      errors.push(
        `"${name}" has an unknown field "${key}". Use only: ${allowed.join(", ")}.`,
      );
  }

  if (data.type !== "fortune" && data.type !== "quote") {
    errors.push(`"${name}": "type" must be "fortune" or "quote".`);
  }
  if (typeof data.text !== "string" || !data.text.trim()) {
    errors.push(`"${name}" needs a "text" with some words in it.`);
  } else if (data.text.length > MAX_TEXT) {
    errors.push(
      `"${name}": the text is ${data.text.length} characters. Keep it to ${MAX_TEXT} or less.`,
    );
  }
  if (
    data.type === "quote" &&
    (typeof data.author !== "string" || !data.author.trim())
  ) {
    errors.push(
      `"${name}": a quote needs an "author", for example "author": "Maya Angelou".`,
    );
  }
  if (data.type === "fortune" && data.author !== undefined) {
    errors.push(
      `"${name}": a fortune doesn't need an "author". Remove it, or change "type" to "quote".`,
    );
  }
  if (
    data.emoji !== undefined &&
    (typeof data.emoji !== "string" || [...data.emoji].length > 4)
  ) {
    errors.push(`"${name}": "emoji" should be a single emoji.`);
  }
}

if (errors.length) {
  console.log("Almost there! Please fix:\n");
  errors.forEach((e) => console.log("  ✗ " + e));
  process.exit(1);
}
console.log("Looks great! Your file is ready to be baked.");
