import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard, FlaskConical, Droplets, AlertTriangle,
  FileText, Settings, ChevronRight, Activity
} from 'lucide-react';
import { toPersian } from '../utils/persian';

export default function Sidebar() {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState('dashboard');
  const isFa = i18n.language?.startsWith('fa') ?? true;
  const num = (v: number) => isFa ? toPersian(v) : v.toString();

  const menuItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { id: 'samples', label: t('nav.samples'), icon: FlaskConical, badge: 12 },
    { id: 'curing', label: t('nav.curing'), icon: Droplets },
    { id: 'alerts', label: t('nav.alerts'), icon: AlertTriangle, badge: 3 },
    { id: 'reports', label: t('nav.reports'), icon: FileText },
    { id: 'settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#0A0F0D] border-l border-white/5 flex flex-col">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#A3D941]/10 border border-[#A3D941]/30 flex items-center justify-center">
            <Activity className="w-5 h-5 text-[#A3D941]" />
          </div>
          <div>
            <h2 className="text-white font-bold">{t('app.name')}</h2>
            <p className="text-xs text-gray-500">{t('app.company')}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive ? 'bg-[#A3D941]/10 border border-[#A3D941]/30' : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#A3D941]' : 'text-gray-400 group-hover:text-white'}`} />
                <span className={`text-sm font-medium ${isActive ? 'text-[#A3D941]' : 'text-gray-400 group-hover:text-white'}`}>
                  {item.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-mono">
                    {num(item.badge)}
                  </span>
                )}
                {isActive && (
                  <motion.div initial={{ x: 5, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-[#A3D941]">
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-[#A3D941] shadow-[0_0_10px_rgba(163,217,65,0.5)]" />
            <span className="text-xs font-medium text-[#A3D941]">{t('app.system_active')}</span>
          </div>
          <p className="text-xs text-gray-500 font-mono">{t('app.version')} - Live</p>
        </div>
      </div>
    </aside>
  );
}
