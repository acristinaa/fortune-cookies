const fs = require("fs");
const path = require("path");

const SRC = "fortunes";
const OUT = "_site";

fs.mkdirSync(OUT, { recursive: true });

const fortunes = [];
for (const file of fs
  .readdirSync(SRC)
  .filter((f) => f.endsWith(".json"))
  .sort()) {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(SRC, file), "utf8"));
    if (data.type !== "fortune" && data.type !== "quote")
      throw new Error('"type" must be fortune or quote');
    if (typeof data.text !== "string" || !data.text.trim())
      throw new Error("missing text");
    fortunes.push({
      github: path.basename(file, ".json"),
      type: data.type,
      text: data.text.trim(),
      author:
        data.type === "quote" && typeof data.author === "string"
          ? data.author.trim()
          : "",
    });
  } catch (err) {
    console.warn(`Skipping ${file}: ${err.message}`);
  }
}

fs.writeFileSync(
  path.join(OUT, "fortunes.json"),
  JSON.stringify(fortunes, null, 2),
);
fs.copyFileSync("index.html", path.join(OUT, "index.html"));
console.log(`Built site with ${fortunes.length} fortune(s).`);
