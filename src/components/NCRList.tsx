import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, CheckCircle, Clock, ArrowUpRight, FileWarning } from 'lucide-react';
import { toPersian } from '../utils/persian';

interface NCR {
  id: string;
  code: string;
  title: string;
  sampleRef: string;
  severity: 'critical' | 'major' | 'minor';
  status: 'open' | 'investigating' | 'resolved';
  reportedAt: string;
  category: string;
}

const ncrs: NCR[] = [
  {
    id: '1',
    code: 'NCR-1405-042',
    title: 'اسلامپ خارج از محدوده مجاز',
    sampleRef: '403-A-125',
    severity: 'major',
    status: 'investigating',
    reportedAt: '۱۴۰۵/۰۷/۱۴',
    category: 'کارایی',
  },
  {
    id: '2',
    code: 'NCR-1405-041',
    title: 'مقاومت ۷ روزه زیر حد قابل قبول',
    sampleRef: '403-A-122',
    severity: 'critical',
    status: 'open',
    reportedAt: '۱۴۰۵/۰۷/۱۲',
    category: 'مقاومت',
  },
  {
    id: '3',
    code: 'NCR-1405-040',
    title: 'دمای بتن تازه بالاتر از حد مجاز',
    sampleRef: '403-A-119',
    severity: 'minor',
    status: 'resolved',
    reportedAt: '۱۴۰۵/۰۷/۰۹',
    category: 'دما',
  },
];

export default function NCRList() {
  const { t, i18n } = useTranslation();
  const isFa = i18n.language?.startsWith('fa') ?? true;
  const num = (v: number | string) => isFa ? toPersian(v) : v.toString();

  const severityConfig = {
    critical: {
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.15)]',
      label: isFa ? 'بحرانی' : 'Critical',
    },
    major: {
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
      label: isFa ? 'مهم' : 'Major',
    },
    minor: {
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      glow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]',
      label: isFa ? 'جزئی' : 'Minor',
    },
  };

  const statusConfig = {
    open: {
      icon: AlertTriangle,
      color: 'text-red-400',
      label: isFa ? 'باز' : 'Open',
    },
    investigating: {
      icon: Clock,
      color: 'text-yellow-400',
      label: isFa ? 'در حال بررسی' : 'Investigating',
    },
    resolved: {
      icon: CheckCircle,
      color: 'text-[#A3D941]',
      label: isFa ? 'حل شده' : 'Resolved',
    },
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      {/* هدر */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileWarning className="w-4 h-4 text-red-400" />
            <span className="text-xs tracking-wider text-gray-400 uppercase">
              {isFa ? 'عدم انطباق‌ها' : 'Non-Conformances'}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white">
            {isFa ? 'گزارش‌های باز' : 'Open Reports'}
          </h3>
          <p className="text-xs text-gray-500 mt-1 font-mono">
            {isFa ? `${num(3)} مورد این هفته` : `${num(3)} this week`}
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#A3D941]/30 transition-all duration-200 group">
          <span className="text-xs text-gray-400 group-hover:text-white">
            {isFa ? 'مشاهده همه' : 'View All'}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#A3D941] transition-colors" />
        </button>
      </div>

      {/* لیست */}
      <div className="space-y-3">
        {ncrs.map((ncr, index) => {
          const sev = severityConfig[ncr.severity];
          const st = statusConfig[ncr.status];
          const StatusIcon = st.icon;

          return (
            <motion.div
              key={ncr.id}
              initial={{ opacity: 0, x: isFa ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`relative p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all duration-200 cursor-pointer group`}
            >
              {/* نوار رنگی سمت راست (بسته به direction) */}
              <div className={`absolute top-0 bottom-0 ${isFa ? 'right-0' : 'left-0'} w-1 rounded-full ${sev.bg.replace('/10', '')}`}
                style={{
                  background: ncr.severity === 'critical' ? '#EF4444'
                            : ncr.severity === 'major' ? '#F59E0B'
                            : '#06B6D4'
                }}
              />

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* کد + badge شدت */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-gray-500">
                      {ncr.code}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md ${sev.bg} border ${sev.border} ${sev.color} text-xs font-medium`}>
                      {sev.label}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-400 text-xs">
                      {ncr.category}
                    </span>
                  </div>

                  {/* عنوان */}
                  <h4 className="text-sm font-medium text-white mb-1 truncate">
                    {ncr.title}
                  </h4>

                  {/* رفرنس + تاریخ */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
                    <span>{isFa ? `نمونه ${ncr.sampleRef}` : `Sample ${ncr.sampleRef}`}</span>
                    <span>•</span>
                    <span>{ncr.reportedAt}</span>
                  </div>
                </div>

                {/* وضعیت */}
                <div className="flex items-center gap-2 shrink-0">
                  <StatusIcon className={`w-4 h-4 ${st.color}`} />
                  <span className={`text-xs font-medium ${st.color} hidden md:inline`}>
                    {st.label}
                  </span>
                </div>
              </div>

              {/* خط hover */}
              <div className={`absolute bottom-0 ${isFa ? 'right-4 left-4' : 'left-4 right-4'} h-px bg-gradient-to-r from-transparent via-[#A3D941]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </motion.div>
          );
        })}
      </div>

      {/* آمار پایین */}
      <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/10">
        <div>
          <div className="text-xs text-gray-500 mb-1">{isFa ? 'باز' : 'Open'}</div>
          <div className="text-lg font-bold text-red-400 font-mono">{num(1)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">{isFa ? 'در بررسی' : 'Investigating'}</div>
          <div className="text-lg font-bold text-yellow-400 font-mono">{num(1)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">{isFa ? 'حل شده' : 'Resolved'}</div>
          <div className="text-lg font-bold text-[#A3D941] font-mono">{num(1)}</div>
        </div>
      </div>
    </div>
  );
}
