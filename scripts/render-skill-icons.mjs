import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS_FILE = join(ROOT, 'src/data/skills.ts');
const OUT_FILE = join(ROOT, 'src/data/skill-icons.ts');

const SETS = { Si: 'si', Fa: 'fa', Tb: 'tb' };

const names = [
  ...new Set([...readFileSync(SKILLS_FILE, 'utf8').matchAll(/icon: '(\w+)'/g)].map((m) => m[1])),
].sort();

const entries = [];
for (const name of names) {
  const set = SETS[name.slice(0, 2)];
  if (!set)
    throw new Error(`No react-icons set for "${name}". Known prefixes: ${Object.keys(SETS)}`);

  const Icon = (await import(`react-icons/${set}`))[name];
  if (!Icon) throw new Error(`"${name}" is not in react-icons/${set}.`);

  const markup = renderToStaticMarkup(createElement(Icon));
  const viewBox = markup.match(/viewBox="([^"]+)"/)[1];
  const paint = [
    ...markup.matchAll(/ (fill|stroke|stroke-width|stroke-linecap|stroke-linejoin)="([^"]+)"/g),
  ]
    .filter((m) => markup.indexOf(m[0]) < markup.indexOf('>'))
    .map(([, key, value]) => [key, value]);
  const body = markup.slice(markup.indexOf('>') + 1, markup.lastIndexOf('</svg>'));
  entries.push({ name, viewBox, paint: Object.fromEntries(paint), body });
}

const source = `export interface SkillIconData {
  viewBox: string;
  paint: Record<string, string>;
  body: string;
}

export const SKILL_ICONS = ${JSON.stringify(Object.fromEntries(entries.map(({ name, ...rest }) => [name, rest])), null, 2)} satisfies Record<string, SkillIconData>;

export type SkillIconName = keyof typeof SKILL_ICONS;
`;

writeFileSync(OUT_FILE, source);
console.log(`Wrote ${entries.length} icons to src/data/skill-icons.ts`);
