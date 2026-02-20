import type { ExperienceItem } from './type';

const isCurrent = (term: string) => /present|current|현재|재직|진행/i.test(term);

const parseStart = (term: string) => {
  // "2024.06–2026.06", "2024.06–진행", "2019.01-2023.10" 등 대응
  const match = term.match(/(\d{4})(?:[.\-/]?(\d{2}))?/);
  if (!match) return 0;
  const year = Number(match[1]);
  const month = match[2] ? Number(match[2]) : 1;
  return year * 12 + month;
};

export function sortExperience(items: ExperienceItem[]) {
  return [...items].sort((a, b) => {
    const aCurrent = isCurrent(a.term);
    const bCurrent = isCurrent(b.term);
    if (aCurrent !== bCurrent) return aCurrent ? -1 : 1;
    return parseStart(b.term) - parseStart(a.term);
  });
}

export function getIsCurrent(term: string) {
  return isCurrent(term);
}

export function getYearLabel(term: string) {
  const m = term.match(/(\d{4})/);
  return m ? m[1] : '';
}
