import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type RegistrySkill = {
  name: string;
  category: string;
  path: string;
  description: string;
};

type RegistryFile = {
  skills: RegistrySkill[];
};

const SKILLS_START = "<!-- SKILLS:START -->";
const SKILLS_END = "<!-- SKILLS:END -->";
const PREFERRED_CATEGORY_ORDER = [
  "coding",
  "writing",
  "research",
  "personal-ops",
];

function toTitleCaseCategory(category: string): string {
  return category
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function renderSkillsBlock(skills: RegistrySkill[]): string {
  const grouped = new Map<string, RegistrySkill[]>();

  for (const skill of skills) {
    const list = grouped.get(skill.category) ?? [];
    list.push(skill);
    grouped.set(skill.category, list);
  }

  const categories = [...grouped.keys()].sort((a, b) => {
    const indexA = PREFERRED_CATEGORY_ORDER.indexOf(a);
    const indexB = PREFERRED_CATEGORY_ORDER.indexOf(b);

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1) {
      return -1;
    }
    if (indexB !== -1) {
      return 1;
    }
    return a.localeCompare(b);
  });
  const lines: string[] = [];

  for (const category of categories) {
    const categoryTitle = toTitleCaseCategory(category);
    const entries = grouped.get(category) ?? [];
    entries.sort((a, b) => a.name.localeCompare(b.name));

    lines.push(`### ${categoryTitle}`);
    lines.push("");

    for (const skill of entries) {
      lines.push(`- [${skill.name}](${skill.path}) - ${skill.description}`);
    }

    lines.push("");
  }

  return lines.join("\n").trimEnd();
}

function replaceSkillsSection(readme: string, block: string): string {
  const startIndex = readme.indexOf(SKILLS_START);
  const endIndex = readme.indexOf(SKILLS_END);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error(
      `README.md must contain both markers: ${SKILLS_START} and ${SKILLS_END}.`,
    );
  }

  const before = readme.slice(0, startIndex);
  const after = readme.slice(endIndex + SKILLS_END.length);

  return `${before}${SKILLS_START}\n${block}\n${SKILLS_END}${after}`;
}

async function main(): Promise<void> {
  const repoRoot = process.cwd();
  const readmePath = path.join(repoRoot, "README.md");
  const registryPath = path.join(repoRoot, "registry.json");

  const [readme, registryRaw] = await Promise.all([
    readFile(readmePath, "utf8"),
    readFile(registryPath, "utf8"),
  ]);

  const registry = JSON.parse(registryRaw) as RegistryFile;
  if (!Array.isArray(registry.skills)) {
    throw new Error("registry.json is missing a valid skills array.");
  }

  const block = renderSkillsBlock(registry.skills);
  const updatedReadme = replaceSkillsSection(readme, block);

  await writeFile(readmePath, updatedReadme, "utf8");
  console.log(`Updated README skills section with ${registry.skills.length} skills.`);
}

await main();
