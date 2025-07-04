import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { AliasOptions } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const aliasesPath = path.resolve(__dirname, "aliases.json");
const raw = fs.readFileSync(aliasesPath, "utf-8");
const aliases: Record<string, string> = JSON.parse(raw);

const transformDataToViteConfig = (aliases: Record<string, string>) => {
  return Object.entries(aliases).map(([alias, relPath]) => ({
    find: alias,
    replacement: path.resolve(__dirname, relPath),
  }));
};

export const aliasesForViteConfig: AliasOptions =
  transformDataToViteConfig(aliases);
