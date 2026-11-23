import { SKILL_ICONS, type SkillIconName } from '../../data/skill-icons';

const PROP_NAMES: Record<string, string> = {
  fill: 'fill',
  stroke: 'stroke',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
};

export function SkillIcon({ name }: { name: SkillIconName }) {
  const { viewBox, paint, body } = SKILL_ICONS[name];
  const paintProps = Object.fromEntries(
    Object.entries(paint).map(([key, value]) => [PROP_NAMES[key] ?? key, value]),
  );

  return (
    <svg
      viewBox={viewBox}
      {...paintProps}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}
