import { SKILL_ICONS, type SkillIconName } from '../../data/skill-icons';

/** SVG attribute names in the generated data, mapped to their React prop names. */
const PROP_NAMES: Record<string, string> = {
  fill: 'fill',
  stroke: 'stroke',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
};

/**
 * A skill logo from the generated SKILL_ICONS map. The markup comes from our
 * own build script, not from user input, so injecting it is safe.
 */
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
