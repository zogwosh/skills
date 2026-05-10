import { cp, mkdir, readdir, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

type SkillEntry = {
  name: string;
  sourceDir: string;
};

async function findSkillEntries(skillsRoot: string): Promise<SkillEntry[]> {
  const skillFiles: string[] = [];

  async function walk(dirPath: string): Promise<void> {
    const entries = await readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }
      if (entry.isFile() && entry.name === "SKILL.md") {
        skillFiles.push(fullPath);
      }
    }
  }

  await walk(skillsRoot);

  const byName = new Map<string, SkillEntry>();

  for (const skillFile of skillFiles) {
    const sourceDir = path.dirname(skillFile);
    const name = path.basename(sourceDir);

    if (byName.has(name)) {
      const existing = byName.get(name);
      throw new Error(
        `Duplicate skill name "${name}" found at "${sourceDir}" and "${existing?.sourceDir}".`,
      );
    }

    byName.set(name, { name, sourceDir });
  }

  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
}

async function main(): Promise<void> {
  const repoRoot = process.cwd();
  const skillsRoot = path.join(repoRoot, "skills");
  const targetRoot = path.join(os.homedir(), ".cc-switch", "skills");
  const entries = await findSkillEntries(skillsRoot);

  if (entries.length < 1) {
    throw new Error("No skills found to install under skills/.");
  }

  await mkdir(targetRoot, { recursive: true });

  for (const entry of entries) {
    const targetDir = path.join(targetRoot, entry.name);
    await rm(targetDir, { recursive: true, force: true });
    await cp(entry.sourceDir, targetDir, { recursive: true, force: true });
    console.log(`Installed ${entry.name}`);
  }

  console.log(`Installed ${entries.length} skills into ${targetRoot}`);
}

await main();
