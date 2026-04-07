import path from "path";
import fs from "fs";

export async function resolveModuleFiles(dir: string): Promise<string[]> {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await resolveModuleFiles(fullPath)));
    } else if (entry.isFile()) {
      const isCodeFile = /\.(ts|js)$/.test(entry.name);
      const isDefinitionFile = entry.name.endsWith(".d.ts");
      const isTestFile = entry.name.includes(".test.") || entry.name.includes(".spec.");

      if (isCodeFile && !isDefinitionFile && !isTestFile) {
        files.push(fullPath);
      }
    }
  }

  return files;
}