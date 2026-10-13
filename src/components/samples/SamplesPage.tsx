/**
 * SamplesPage — Full sample registry page
 */

import { useTranslation } from 'react-i18next';
import { FlaskConical } from 'lucide-react';
import { PageHeader, EmptyState, SectionTitle } from '../../design-system';
import { usePersianNumber } from '../../design-system';
import { SamplesTable } from './SamplesTable';
import { mockSamplesFull } from '../../data/samples';

export function SamplesPage() {
  const { t } = useTranslation();
  const { format } = usePersianNumber();
  const samples = mockSamplesFull;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <PageHeader
        kicker="EX-QC · SAMPLES REGISTRY"
        title={t('samples.title')}
        description={t('samples.subtitle')}
        status={{
          variant: 'live',
          text: t('app.live'),
          pulse: true,
        }}
      />

      <section>
        <SectionTitle
          accent="brand"
          action={
            <span className="text-xs text-[#475569] font-mono">
              {t('samples.count', { count: format(samples.length) })}
            </span>
          }
        >
          {t('samples.title')}
        </SectionTitle>

        {samples.length === 0 ? (
          <EmptyState
            icon={<FlaskConical className="w-6 h-6" />}
            title={t('samples.title')}
            description={t('samples.subtitle')}
          />
        ) : (
          <SamplesTable rows={samples} />
        )}
      </section>
    </div>
  );
}
