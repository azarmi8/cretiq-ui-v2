import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Target } from 'lucide-react';
import { toPersian, toPersianFixed } from '../utils/persian';

const data = [
  { age: 3,  ageKey: '3',  strength: 15, target: 12 },
  { age: 7,  ageKey: '7',  strength: 22, target: 20 },
  { age: 28, ageKey: '28', strength: 34, target: 30 },
  { age: 90, ageKey: '90', strength: 38, target: 35 },
];

const CHART_WIDTH = 500;
const CHART_HEIGHT = 200;
const PADDING = 30;
const MAX_VALUE = 45;

const getX = (i: number) => PADDING + (i * (CHART_WIDTH - 2 * PADDING)) / (data.length - 1);
const getY = (v: number) => CHART_HEIGHT - PADDING - (v / MAX_VALUE) * (CHART_HEIGHT - 2 * PADDING);

export default function ResistanceChart() {
  const { t, i18n } = useTranslation();
  const isFa = i18n.language?.startsWith('fa') ?? true;
  const num = (v: number | string) => isFa ? toPersian(v) : v.toString();
  const numF = (v: number) => isFa ? toPersianFixed(v) : v.toFixed(1);

  const mainPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.strength)}`).join(' ');
  const areaPath = `${mainPath} L ${getX(data.length - 1)} ${CHART_HEIGHT - PADDING} L ${getX(0)} ${CHART_HEIGHT - PADDING} Z`;
  const targetPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.target)}`).join(' ');

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-[#A3D941]" />
            <span className="text-xs tracking-wider text-gray-400 uppercase">{t('chart.title')}</span>
          </div>
          <h3 className="text-lg font-bold text-white">{t('chart.subtitle', { grade: 'C30' })}</h3>
          <p className="text-xs text-gray-500 mt-1 font-mono">{t('chart.sample_ref', { code: '403-A-127' })}</p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#A3D941]/10 border border-[#A3D941]/30">
          <Target className="w-3.5 h-3.5 text-[#A3D941]" />
          <span className="text-xs text-[#A3D941] font-medium">{t('chart.target', { value: num(30) })}</span>
        </div>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="w-full h-56" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A3D941" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#A3D941" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A3D941" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>

          {[0, 10, 20, 30, 40].map((val) => (
            <g key={val}>
              <line x1={PADDING} x2={CHART_WIDTH - PADDING} y1={getY(val)} y2={getY(val)} stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="2 4" />
              <text x={PADDING - 8} y={getY(val) + 4} fill="rgba(148,163,184,0.5)" fontSize="10" fontFamily="JetBrains Mono, monospace" textAnchor="end">
                {num(val)}
              </text>
            </g>
          ))}

          <motion.path d={areaPath} fill="url(#areaGradient)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} />
          <motion.path d={targetPath} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.3 }} />
          <motion.path d={mainPath} fill="none" stroke="url(#lineGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: 'easeInOut' }} style={{ filter: 'drop-shadow(0 0 8px rgba(163,217,65,0.5))' }} />

          {data.map((d, i) => (
            <g key={i}>
              <motion.circle cx={getX(i)} cy={getY(d.strength)} r="8" fill="#A3D941" opacity="0.2" animate={{ r: [8, 12, 8], opacity: [0.2, 0, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />
              <motion.circle cx={getX(i)} cy={getY(d.strength)} r="5" fill="#0F1410" stroke="#A3D941" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }} />
              <text x={getX(i)} y={getY(d.strength) - 14} fill="#A3D941" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">
                {num(d.strength)}
              </text>
            </g>
          ))}

          {data.map((d, i) => (
            <text key={i} x={getX(i)} y={CHART_HEIGHT - 10} fill="rgba(148,163,184,0.7)" fontSize="11" textAnchor="middle">
              {t(`chart.ages.${d.ageKey}`)}
            </text>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10">
        <div>
          <div className="text-xs text-gray-500 mb-1">{t('chart.current_strength')}</div>
          <div className="text-lg font-bold text-[#A3D941] font-mono">{numF(22)} <span className="text-xs">MPa</span></div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">{t('chart.predicted_28d')}</div>
          <div className="text-lg font-bold text-cyan-400 font-mono">{numF(34)} <span className="text-xs">MPa</span></div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">{t('chart.status')}</div>
          <div className="flex items-center gap-1.5">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-[#A3D941]" />
            <span className="text-sm font-medium text-[#A3D941]">{t('chart.optimal')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
