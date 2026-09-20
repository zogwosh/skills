import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type ParsedFrontmatter = {
  name?: string;
  description?: string;
  error?: string;
};

type RegistrySkill = {
  name: string;
  category: string;
  path: string;
  description: string;
  tags: string[];
  platforms: string[];
  status: "active";
};

const PLATFORM_LIST = ["claude-code", "ccswitch", "chatgpt", "codex"];

async function findSkillFiles(skillsRoot: string): Promise<string[]> {
  const results: string[] = [];

  async function walk(dirPath: string): Promise<void> {
    const entries = await readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }
      if (entry.isFile() && entry.name === "SKILL.md") {
        results.push(fullPath);
      }
    }
  }

  await walk(skillsRoot);
  return results;
}

function normalizeNewlines(text: string): string {
  return text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
}

function parseFrontmatter(content: string): ParsedFrontmatter {
  const normalized = normalizeNewlines(content);
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    return { error: "Missing YAML frontmatter block." };
  }

  let name: string | undefined;
  let description: string | undefined;

  for (const rawLine of match[1].split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1).trim();
    }

    if (key === "name") {
      name = value;
    } else if (key === "description") {
      description = value;
    }
  }

  return { name, description };
}

function toPosixPath(filePath: string): string {
  return filePath.split(path.sep).join("/");
}

function tagsFor(category: string, name: string): string[] {
  return [category, ...name.split("-")];
}

async function main(): Promise<void> {
  const repoRoot = process.cwd();
  const skillsRoot = path.join(repoRoot, "skills");
  const registryPath = path.join(repoRoot, "registry.json");
  const skillFiles = await findSkillFiles(skillsRoot);
  const skills: RegistrySkill[] = [];
  const seen = new Set<string>();

  if (skillFiles.length < 1) {
    throw new Error("No SKILL.md files found under skills/.");
  }

  for (const skillFile of skillFiles) {
    const relative = toPosixPath(path.relative(repoRoot, skillFile));
    const segments = relative.split("/");

    if (segments.length < 4 || segments[0] !== "skills") {
      throw new Error(
        `${relative}: Invalid skill path. Expected skills/<category>/<skill-name>/SKILL.md.`,
      );
    }

    const category = segments[1];
    const skillNameFromPath = segments[segments.length - 2];
    const skillDirPath = segments.slice(0, -1).join("/");
    const content = await readFile(skillFile, "utf8");
    const parsed = parseFrontmatter(content);

    if (parsed.error) {
      throw new Error(`${relative}: ${parsed.error}`);
    }

    if (!parsed.name || !parsed.description) {
      throw new Error(
        `${relative}: Frontmatter requires both "name" and "description".`,
      );
    }

    if (parsed.name !== skillNameFromPath) {
      throw new Error(
        `${relative}: Frontmatter name "${parsed.name}" does not match directory "${skillNameFromPath}".`,
      );
    }

    if (seen.has(parsed.name)) {
      throw new Error(`Duplicate skill name "${parsed.name}" found in skills/.`);
    }
    seen.add(parsed.name);

    skills.push({
      name: parsed.name,
      category,
      path: skillDirPath,
      description: parsed.description,
      tags: tagsFor(category, parsed.name),
      platforms: [...PLATFORM_LIST],
      status: "active",
    });
  }

  skills.sort((a, b) => {
    if (a.category === b.category) {
      return a.name.localeCompare(b.name);
    }
    return a.category.localeCompare(b.category);
  });

  const registry = {
    schema_version: "1.0",
    ccswitch: {
      branch: "main",
      subdirectory: "skills",
    },
    skills,
  };

  await writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`, "utf8");
  console.log(`Wrote registry.json with ${skills.length} skills.`);
}

await main();
