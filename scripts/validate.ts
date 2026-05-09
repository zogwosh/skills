import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

type ParsedFrontmatter = {
  name?: string;
  description?: string;
  error?: string;
};

const NAME_PATTERN = /^[a-z0-9-]+$/;
const SKILLS_START = "<!-- SKILLS:START -->";
const SKILLS_END = "<!-- SKILLS:END -->";

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

  try {
    await walk(skillsRoot);
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code !== "ENOENT") {
      throw error;
    }
  }

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

async function main(): Promise<void> {
  const repoRoot = process.cwd();
  const skillsRoot = path.join(repoRoot, "skills");
  const readmePath = path.join(repoRoot, "README.md");
  const skillFiles = await findSkillFiles(skillsRoot);
  const errors: string[] = [];
  const seenNames = new Map<string, string>();

  if (skillFiles.length < 1) {
    errors.push("At least one skill is required under skills/.");
  }

  for (const skillFile of skillFiles) {
    const relative = toPosixPath(path.relative(repoRoot, skillFile));
    const segments = relative.split("/");

    if (segments.length < 4 || segments[0] !== "skills") {
      errors.push(
        `${relative}: Skill path must follow skills/<category>/<skill-name>/SKILL.md.`,
      );
      continue;
    }

    const dirName = segments[segments.length - 2];
    const fileContent = await readFile(skillFile, "utf8");
    const parsed = parseFrontmatter(fileContent);

    if (parsed.error) {
      errors.push(`${relative}: ${parsed.error}`);
      continue;
    }

    if (!parsed.name) {
      errors.push(`${relative}: Missing frontmatter field "name".`);
    } else {
      if (!NAME_PATTERN.test(parsed.name)) {
        errors.push(
          `${relative}: name "${parsed.name}" must use lowercase letters, numbers, and hyphens only.`,
        );
      }

      if (parsed.name !== dirName) {
        errors.push(
          `${relative}: name "${parsed.name}" must match directory "${dirName}".`,
        );
      }

      const duplicatePath = seenNames.get(parsed.name);
      if (duplicatePath) {
        errors.push(
          `${relative}: duplicate skill name "${parsed.name}" already used by ${duplicatePath}.`,
        );
      } else {
        seenNames.set(parsed.name, relative);
      }
    }

    if (!parsed.description) {
      errors.push(`${relative}: Missing frontmatter field "description".`);
    } else if (parsed.description.trim().length < 40) {
      errors.push(
        `${relative}: description must be at least 40 characters.`,
      );
    }
  }

  let readmeContent = "";
  try {
    readmeContent = await readFile(readmePath, "utf8");
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === "ENOENT") {
      errors.push("README.md is missing.");
    } else {
      throw error;
    }
  }

  if (readmeContent) {
    if (!readmeContent.includes(SKILLS_START)) {
      errors.push(`README.md is missing marker ${SKILLS_START}.`);
    }
    if (!readmeContent.includes(SKILLS_END)) {
      errors.push(`README.md is missing marker ${SKILLS_END}.`);
    }
  }

  if (errors.length > 0) {
    console.error("FAIL: validation failed.");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`PASS: validated ${skillFiles.length} skills.`);
}

await main();
