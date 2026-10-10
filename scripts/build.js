const fs = require("fs");
const path = require("path");

const SRC = "fortunes";
const OUT = "_site";

fs.mkdirSync(OUT, { recursive: true });

const fortunes = [];
for (const file of fs.readdirSync(SRC).filter((f) => f.endsWith(".json")).sort()) {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(SRC, file), "utf8"));
    if (typeof data.fortune !== "string" || !data.fortune.trim()) throw new Error("missing fortune");
    fortunes.push({
      author: path.basename(file, ".json"),
      fortune: data.fortune.trim(),
      emoji: typeof data.emoji === "string" ? data.emoji.trim() : "",
    });
  } catch (err) {
    console.warn(`Skipping ${file}: ${err.message}`);
  }
}

fs.writeFileSync(path.join(OUT, "fortunes.json"), JSON.stringify(fortunes, null, 2));
fs.copyFileSync("index.html", path.join(OUT, "index.html"));
console.log(`Built site with ${fortunes.length} fortune(s).`);