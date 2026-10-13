import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Beaker, Thermometer, Droplets, AlertTriangle, CheckCircle } from 'lucide-react';
import { toPersian, toPersianFixed } from '../utils/persian';

interface Props {
  sampleCode: string;
  concreteGrade: string;
  castingDate: string;
  testAge: number;
  currentDay: number;
  status: 'curing' | 'ready' | 'warning' | 'danger';
  temperature: number;
  humidity: number;
}

export default function ConcreteSampleCard({
  sampleCode, concreteGrade, castingDate, testAge,
  currentDay, status, temperature, humidity,
}: Props) {
  const { t, i18n } = useTranslation();
  const isFa = i18n.language?.startsWith('fa') ?? true;
  const num = (v: number | string) => isFa ? toPersian(v) : v.toString();
  const numF = (v: number) => isFa ? toPersianFixed(v) : v.toFixed(1);

  const cfg = {
    curing:  { color: 'text-green-400',  bg: 'bg-green-400',  glow: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]' },
    ready:   { color: 'text-cyan-400',   bg: 'bg-cyan-400',   glow: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]' },
    warning: { color: 'text-yellow-400', bg: 'bg-yellow-400', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]' },
    danger:  { color: 'text-red-400',    bg: 'bg-red-400',    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]' },
  }[status];

  const progress = (currentDay / testAge) * 100;
  const daysRemaining = testAge - currentDay;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="relative group">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 hover:border-[#A3D941]/30">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Beaker className="w-4 h-4 text-[#A3D941]" />
              <span className="text-xs tracking-wider text-gray-400 uppercase">{t('sample.title')}</span>
            </div>
            <h3 className="text-xl font-bold text-white font-mono">{sampleCode}</h3>
          </div>
          <span className="px-3 py-1 rounded-lg bg-[#A3D941]/10 border border-[#A3D941]/30 text-[#A3D941] text-sm font-mono font-bold">
            {concreteGrade}
          </span>
        </div>

        <div className="flex items-center justify-between mb-4 text-sm">
          <span className="text-gray-400">{t('sample.casting_date')}:</span>
          <span className="text-white font-mono">{castingDate}</span>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">{t('sample.test_age', { age: num(testAge) })}</span>
            <span className={`text-xs font-bold ${cfg.color} font-mono`}>
              {daysRemaining > 0 ? t('sample.days_remaining', { days: num(daysRemaining) }) : t('sample.ready')}
            </span>
          </div>
          <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1 }} className={`h-full ${cfg.bg} rounded-full ${cfg.glow}`} />
            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white/20 to-transparent" />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500 font-mono">
            <span>{t('sample.day', { n: num(currentDay) })}</span>
            <span>{t('sample.day', { n: num(testAge) })}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
            <Thermometer className="w-4 h-4 text-orange-400" />
            <div>
              <div className="text-xs text-gray-400">{t('sample.temperature')}</div>
              <div className="text-sm font-mono text-white">{numF(temperature)}°C</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
            <Droplets className="w-4 h-4 text-cyan-400" />
            <div>
              <div className="text-xs text-gray-400">{t('sample.humidity')}</div>
              <div className="text-sm font-mono text-white">{num(humidity)}%</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className={`w-2 h-2 rounded-full ${cfg.bg} ${cfg.glow}`} />
            <span className={`text-sm font-medium ${cfg.color}`}>{t(`sample.status.${status}`)}</span>
          </div>
          {status === 'danger' && <AlertTriangle className="w-4 h-4 text-red-400" />}
          {status === 'ready' && <CheckCircle className="w-4 h-4 text-cyan-400" />}
        </div>
      </div>
    </motion.div>
  );
}
