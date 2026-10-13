import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  LayoutDashboard,
  FlaskConical,
  Droplets,
  Microscope,
  AlertTriangle,
  BarChart3,
  Wind,
  Bot,
  Globe,
  FileText,
  Settings,
  Search,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SyncDirection } from './design-system';
import {
  AppShell,
  Sidebar,
  TopBar,
  CommandPalette,
  type NavItem,
  type CommandItem,
} from './design-system';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { SamplesPage } from './components/samples/SamplesPage';
import { LanguageToggle } from './components/dashboard/LanguageToggle';
import { NotificationsButton } from './components/dashboard/NotificationsButton';
import { UserMenu } from './components/dashboard/UserMenu';
import { mockSamplesFull } from './data/samples';
import { ncrCounts } from './data/ncr';

function AppInner() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const navItems: NavItem[] = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'samples',   label: t('nav.samples'),   icon: <FlaskConical className="w-5 h-5" />, badge: mockSamplesFull.length },
    { id: 'curing',    label: t('nav.curing'),    icon: <Droplets className="w-5 h-5" /> },
    { id: 'lab',       label: t('nav.lab'),       icon: <Microscope className="w-5 h-5" /> },
    { id: 'alerts',    label: t('nav.alerts'),    icon: <AlertTriangle className="w-5 h-5" />, badge: ncrCounts.active },
    { id: 'analytics', label: t('nav.analytics'), icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'env',       label: t('nav.env'),       icon: <Wind className="w-5 h-5" /> },
    { id: 'ai',        label: t('nav.ai'),        icon: <Bot className="w-5 h-5" /> },
    { id: 'world',     label: t('nav.world'),     icon: <Globe className="w-5 h-5" /> },
    { id: 'reports',   label: t('nav.reports'),   icon: <FileText className="w-5 h-5" /> },
    { id: 'settings',  label: t('nav.settings'),  icon: <Settings className="w-5 h-5" /> },
  ];

  const commandItems: CommandItem[] = useMemo(
    () =>
      navItems.map((item) => ({
        id: `nav-${item.id}`,
        label: item.label,
        group: t('command.groups.navigate'),
        icon: item.icon,
        onSelect: () => setActiveId(item.id),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  const Logo = (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#45D483]/20 to-[#2DE2E6]/20 border border-[#45D483]/30 flex items-center justify-center shrink-0">
        <Activity className="w-5 h-5 text-[#45D483]" />
      </div>
      {!collapsed && (
        <div className="overflow-hidden">
          <h2 className="text-white font-bold text-lg tracking-tight">Cretiq</h2>
          <p className="text-[10px] text-[#45D483]/70 tracking-widest uppercase">
            Intelligence
          </p>
        </div>
      )}
    </div>
  );

  const renderPage = () => {
    switch (activeId) {
      case 'dashboard':
        return <DashboardPage />;
      case 'samples':
        return <SamplesPage />;
      default:
        return (
          <div className="p-12 text-center text-[#475569]">
            {t('app.page_under_construction', { page: activeId })}
          </div>
        );
    }
  };

  return (
    <>
      <AppShell
        sidebar={
          <Sidebar
            logo={Logo}
            items={navItems}
            activeId={activeId}
            onNavigate={setActiveId}
            labels={{ collapse: t('app.collapse') }}
            collapsed={collapsed}
            onToggleCollapsed={() => setCollapsed((c) => !c)}
          />
        }
        topBar={
          <TopBar
            title={t(`nav.${activeId}`)}
            liveStatus={{ variant: 'live', text: t('app.live'), pulse: true }}
            actions={
              <>
                <button
                  onClick={() => setPaletteOpen(true)}
                  className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#45D483]/30 transition-all text-xs text-[#94A3B8]"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{t('command.search')}</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono">
                    ⌘K
                  </kbd>
                </button>
                <LanguageToggle />
                <NotificationsButton count={ncrCounts.active} />
              </>
            }
            user={<UserMenu />}
          />
        }
      >
        {renderPage()}
      </AppShell>

      <CommandPalette
        items={commandItems}
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
      />
    </>
  );
}

export default function App() {
  return (
    <SyncDirection>
      <AppInner />
    </SyncDirection>
  );
}
