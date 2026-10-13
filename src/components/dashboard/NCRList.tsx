import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock, ArrowUpRight, FileWarning } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GlassCard, StatusBadge } from '../../design-system';
import { usePersianNumber } from '../../design-system';
import { mockNCRs, ncrCounts } from '../../data/ncr';

const SEVERITY_MAP = {
  critical: { variant: 'danger' as const, border: 'border-r-[#FF5C67]' },
  major: { variant: 'warning' as const, border: 'border-r-[#F5B544]' },
  minor: { variant: 'info' as const, border: 'border-r-[#2DE2E6]' },
};

const STATUS_MAP = {
  open: { variant: 'danger' as const, icon: AlertTriangle },
  investigating: { variant: 'warning' as const, icon: Clock },
  resolved: { variant: 'live' as const, icon: CheckCircle },
};

export function NCRList() {
  const { i18n } = useTranslation();
  const { format } = usePersianNumber();
  const isFa = i18n.language?.startsWith('fa');

  return (
    <GlassCard>
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileWarning className="w-4 h-4 text-[#FF5C67]" />
            <span className="text-[10px] tracking-widest uppercase text-[#475569]">
              {isFa ? 'عدم انطباق‌ها' : 'Non-Conformances'}
            </span>
          </div>
          <h3 className="text-base font-bold text-[#E7F7F8]">
            {isFa ? 'گزارش‌های باز' : 'Open Reports'}
          </h3>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#45D483]/30 transition-all text-xs text-[#94A3B8]">
          {isFa ? 'مشاهده همه' : 'View All'}
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-2">
        {mockNCRs.map((ncr, i) => {
          const sev = SEVERITY_MAP[ncr.severity];
          const st = STATUS_MAP[ncr.status];
          const StatusIcon = st.icon;

          return (
            <motion.div
              key={ncr.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer border-r-2 ${sev.border}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-[10px] font-mono text-[#475569]">{ncr.code}</span>
                    <StatusBadge variant={sev.variant}>
                      {ncr.severity === 'critical' ? (isFa ? 'بحرانی' : 'Critical') : ncr.severity === 'major' ? (isFa ? 'مهم' : 'Major') : (isFa ? 'جزئی' : 'Minor')}
                    </StatusBadge>
                    <span className="text-[10px] text-[#475569]">{ncr.category}</span>
                  </div>
                  <h4 className="text-sm font-medium text-[#E7F7F8] mb-1 truncate">{ncr.title}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-[#475569] font-mono">
                    <span>{isFa ? `نمونه ${ncr.sampleRef}` : `Sample ${ncr.sampleRef}`}</span>
                    <span>·</span>
                    <span>{ncr.reportedAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <StatusIcon className="w-3.5 h-3.5 text-[#94A3B8]" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-white/5">
        <div>
          <div className="text-[10px] text-[#475569] mb-1">{isFa ? 'باز' : 'Open'}</div>
          <div className="text-base font-bold text-[#FF5C67] font-mono">{format(ncrCounts.open)}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#475569] mb-1">{isFa ? 'در بررسی' : 'Investigating'}</div>
          <div className="text-base font-bold text-[#F5B544] font-mono">{format(ncrCounts.investigating)}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#475569] mb-1">{isFa ? 'حل شده' : 'Resolved'}</div>
          <div className="text-base font-bold text-[#45D483] font-mono">{format(ncrCounts.resolved)}</div>
        </div>
      </div>
    </GlassCard>
  );
}
