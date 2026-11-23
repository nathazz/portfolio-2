import { useTranslation } from 'react-i18next';
import { SKILL_GROUPS } from '../../data/skills';
import { Window } from '../layout/Window';
import { SkillIcon } from '../ui/SkillIcon';

const SKILL_COUNT = SKILL_GROUPS.reduce((total, group) => total + group.skills.length, 0);

/** Every skill visible at once, laid out as a spec sheet: one row per category. */
export function Skills() {
  const { t } = useTranslation();

  return (
    <Window
      id="skills"
      title={t('skills.title')}
      status={t('skills.status', { count: SKILL_COUNT })}
    >
      <dl>
        {SKILL_GROUPS.map((group) => (
          <div key={group.id} className="sheet-row">
            <dt className="text-fluid-lg font-semibold">{t(`skills.categories.${group.id}`)}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map(({ name, detail, icon }) => (
                  <li key={name} className="chip">
                    <SkillIcon name={icon} />
                    {name}
                    {detail && <span className="chip__detail">{detail}</span>}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Window>
  );
}
