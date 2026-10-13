/**
 * DashboardPage — Cretiq v2 Dashboard
 * Live numbers + sparklines + "last updated" indicator.
 */

import { useEffect, useState } from 'react';
import { Activity, FlaskConical, AlertTriangle, Droplets } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  PageHeader,
  KPIRow,
  KPICard,
  MetricReadout,
  SectionTitle,
  LiveNumber,
  Sparkline,
} from '../../design-system';
import { usePersianNumber, useTimeAgo } from '../../design-system';
import { SampleCard } from './SampleCard';
import { ResistanceChart } from './ResistanceChart';
import { NCRList } from './NCRList';
import { mockSamples, mockMetrics } from '../../data/dashboard';

// Static sparkline data (7 days)
const SPARKS = {
  samples: [8, 9, 11, 10, 12, 11, 12],
  curing: [6, 6, 7, 8, 7, 8, 8],
  alerts: [2, 3, 3, 4, 3, 3, 3],
  oee: [88, 89, 90, 91, 90, 92, 92],
};

export function DashboardPage() {
  const { t } = useTranslation();
  const { format } = usePersianNumber();
  const timeAgo = useTimeAgo();

  // Heartbeat: pretend data refreshes every 30 seconds
  const [lastUpdate, setLastUpdate] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setLastUpdate(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <PageHeader
        kicker="EX-QC · DASHBOARD"
        title={t('dashboard.title')}
        description={t('dashboard.subtitle')}
        status={{
          variant: 'live',
          text: t('app.live'),
          pulse: true,
        }}
        meta={
          <span className="text-[10px] text-[#475569] font-mono">
            {t('dashboard.updated')}: <LiveNumber value={timeAgo(lastUpdate)} pulse={false} />
          </span>
        }
      />

      <KPIRow columns={4}>
        <KPICard>
          <div className="flex items-start justify-between mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#45D483]/10 border border-[#45D483]/20 flex items-center justify-center">
              <FlaskConical className="w-4 h-4 text-[#45D483]" />
            </div>
            <Sparkline data={SPARKS.samples} color="#45D483" />
          </div>
          <MetricReadout
            label={t('dashboard.active_samples')}
            value={<LiveNumber value={format(mockMetrics.activeSamples.value)} className="font-mono text-3xl font-bold text-[#45D483]" />}
            detail={mockMetrics.activeSamples.trend}
          />
        </KPICard>

        <KPICard>
          <div className="flex items-start justify-between mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#2DE2E6]/10 border border-[#2DE2E6]/20 flex items-center justify-center">
              <Droplets className="w-4 h-4 text-[#2DE2E6]" />
            </div>
            <Sparkline data={SPARKS.curing} color="#2DE2E6" />
          </div>
          <MetricReadout
            label={t('dashboard.curing_tank')}
            value={<LiveNumber value={format(mockMetrics.curingTank.value)} className="font-mono text-3xl font-bold text-[#2DE2E6]" />}
            detail={mockMetrics.curingTank.trend}
          />
        </KPICard>

        <KPICard>
          <div className="flex items-start justify-between mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#FF5C67]/10 border border-[#FF5C67]/20 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-[#FF5C67]" />
            </div>
            <Sparkline data={SPARKS.alerts} color="#FF5C67" />
          </div>
          <MetricReadout
            label={t('dashboard.alerts')}
            value={<LiveNumber value={format(mockMetrics.alerts.value)} className="font-mono text-3xl font-bold text-[#FF5C67]" />}
            detail={mockMetrics.alerts.trend}
          />
        </KPICard>

        <KPICard>
          <div className="flex items-start justify-between mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#45D483]/10 border border-[#45D483]/20 flex items-center justify-center">
              <Activity className="w-4 h-4 text-[#45D483]" />
            </div>
            <Sparkline data={SPARKS.oee} color="#45D483" />
          </div>
          <MetricReadout
            label={t('dashboard.oee')}
            value={<LiveNumber value={format(mockMetrics.oee.value)} className="font-mono text-3xl font-bold text-[#45D483]" />}
            unit={mockMetrics.oee.unit}
            detail={mockMetrics.oee.trend}
          />
        </KPICard>
      </KPIRow>

      <section>
        <SectionTitle
          accent="brand"
          action={
            <span className="text-xs text-[#475569] font-mono">
              {t('dashboard.count', { count: format(mockSamples.length) })}
            </span>
          }
        >
          {t('dashboard.active_samples')}
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockSamples.map((sample) => (
            <SampleCard
              key={sample.id}
              code={sample.code}
              grade={sample.grade}
              castingDate={sample.castingDate}
              testAge={sample.testAge}
              currentDay={sample.currentDay}
              status={sample.status}
              temperature={sample.temperature}
              humidity={sample.humidity}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle accent="cyan">{t('dashboard.analytics')}</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ResistanceChart />
          <NCRList />
        </div>
      </section>
    </div>
  );
}
