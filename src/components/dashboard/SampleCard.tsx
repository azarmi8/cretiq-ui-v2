/**
 * SampleCard — Concrete sample status card
 * Uses design system primitives + tokens
 */

import { motion } from 'framer-motion';
import { Beaker, Thermometer, Droplets, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GlassCard, StatusBadge, type StatusVariant } from '../../design-system';
import { usePersianNumber } from '../../design-system';

interface SampleCardProps {
  code: string;
  grade: string;
  castingDate: string;
  testAge: number;
  currentDay: number;
  status: 'curing' | 'ready' | 'warning' | 'danger';
  temperature: number;
  humidity: number;
}

const STATUS_MAP: Record<
  SampleCardProps['status'],
  { variant: StatusVariant; labelKey: string }
> = {
  curing: { variant: 'live', labelKey: 'sample.status.curing' },
  ready: { variant: 'info', labelKey: 'sample.status.ready' },
  warning: { variant: 'warning', labelKey: 'sample.status.warning' },
  danger: { variant: 'danger', labelKey: 'sample.status.danger' },
};

const PROGRESS_COLORS: Record<SampleCardProps['status'], string> = {
  curing: 'bg-[#45D483]',
  ready: 'bg-[#2DE2E6]',
  warning: 'bg-[#F5B544]',
  danger: 'bg-[#FF5C67]',
};

export function SampleCard({
  code,
  grade,
  castingDate,
  testAge,
  currentDay,
  status,
  temperature,
  humidity,
}: SampleCardProps) {
  const { t } = useTranslation();
  const { format, formatFixed } = usePersianNumber();
  const config = STATUS_MAP[status];
  const progress = (currentDay / testAge) * 100;
  const daysRemaining = testAge - currentDay;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard interactive>
        {/* Header: code + grade */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Beaker className="w-4 h-4 text-[#45D483]" />
              <span className="text-[10px] tracking-widest uppercase text-[#475569]">
                {t('sample.title')}
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#E7F7F8] font-mono">
              {code}
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-[#45D483]/10 border border-[#45D483]/30 text-[#45D483] text-xs font-mono font-bold">
            {grade}
          </span>
        </div>

        {/* Casting date */}
        <div className="flex items-center justify-between text-xs mb-4">
          <span className="text-[#94A3B8]">{t('sample.casting_date')}</span>
          <span className="text-[#E7F7F8] font-mono">{castingDate}</span>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-[#94A3B8]">
              {t('sample.test_age', { age: format(testAge) })}
            </span>
            <span className="text-[11px] font-bold text-[#45D483] font-mono">
              {daysRemaining > 0
                ? t('sample.days_remaining', { days: format(daysRemaining) })
                : t('sample.ready')}
            </span>
          </div>

          <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full rounded-full ${PROGRESS_COLORS[status]}`}
            />
          </div>

          <div className="flex justify-between mt-1.5 text-[10px] text-[#475569] font-mono">
            <span>{format(currentDay)}</span>
            <span>{format(testAge)}</span>
          </div>
        </div>

        {/* Temperature + Humidity */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
            <Thermometer className="w-3.5 h-3.5 text-[#F5B544]" />
            <div>
              <div className="text-[10px] text-[#475569]">{t('sample.temperature')}</div>
              <div className="text-xs text-[#E7F7F8] font-mono">
                {formatFixed(temperature)}°
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
            <Droplets className="w-3.5 h-3.5 text-[#2DE2E6]" />
            <div>
              <div className="text-[10px] text-[#475569]">{t('sample.humidity')}</div>
              <div className="text-xs text-[#E7F7F8] font-mono">
                {format(humidity)}٪
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <StatusBadge variant={config.variant} pulse={status === 'curing'} dot>
            {t(config.labelKey)}
          </StatusBadge>
          {status === 'danger' && <AlertTriangle className="w-4 h-4 text-[#FF5C67]" />}
          {status === 'ready' && <CheckCircle className="w-4 h-4 text-[#2DE2E6]" />}
        </div>
      </GlassCard>
    </motion.div>
  );
}
