const isCurrent = (term: string) => /present|current|현재|재직|진행/i.test(term);

export function formatTerm(term: string, locale: 'ko' | 'en') {
  if (!isCurrent(term)) return term;

  const startMatch = term.match(/(\d{4}[.\-/]?\d{2})/);
  if (!startMatch) return term;

  const start = startMatch[1];
  const present = locale === 'ko' ? '현재' : 'Present';

  return `${start}–${present}`;
}

export function getIsCurrent(term: string) {
  return isCurrent(term);
}
