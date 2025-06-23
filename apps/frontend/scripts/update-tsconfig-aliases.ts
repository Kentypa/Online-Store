import fs from "fs/promises";
import path from "path";

const ROOT = process.cwd();
const ALIASES_PATH = path.join(ROOT, "aliases.json");
const TSCONFIG_PATH = path.join(ROOT, "tsconfig.app.json");

async function updateAliases() {
  try {
    const rawAliases = await fs.readFile(ALIASES_PATH, "utf-8");
    const aliases = JSON.parse(rawAliases);

    const paths: Record<string, string[]> = {};
    for (const [alias, relPath] of Object.entries(aliases)) {
      const key = alias === "@" ? "@/*" : `${alias}/*`;
      const value = `${relPath}/*`;
      paths[key] = [value];
    }

    const rawTsConfig = await fs.readFile(TSCONFIG_PATH, "utf-8");
    const tsconfig = JSON.parse(rawTsConfig);

    tsconfig.compilerOptions ||= {};
    tsconfig.compilerOptions.baseUrl = "src";
    tsconfig.compilerOptions.paths = paths;

    await fs.writeFile(
      TSCONFIG_PATH,
      JSON.stringify(tsconfig, null, 2),
      "utf-8"
    );
    console.log("tsconfig.app.json updated.");
  } catch (error) {
    console.error("Error at updating aliases:", error);
    process.exit(1);
  }
}

updateAliases();
