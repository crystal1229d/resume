import type { Locale } from '@/shared/lib/i18n';

import AboutPage from './about/page';

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  return <AboutPage params={params} />;
}
