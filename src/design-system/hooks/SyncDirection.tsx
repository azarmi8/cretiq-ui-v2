/**
 * SyncDirection — Cretiq Design System
 * 
 * Automatically syncs DirectionProvider with i18next language changes.
 * Place inside i18n provider, above the app.
 */

import { useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { DirectionProvider, type Direction, type Language } from './DirectionContext';

export function SyncDirection({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [direction, setDirection] = useState<Direction>('rtl');
  const [language, setLanguage] = useState<Language>('fa');

  useEffect(() => {
    const handleChange = (lng: string) => {
      const isRtl = lng.startsWith('fa') || lng.startsWith('ar');
      setDirection(isRtl ? 'rtl' : 'ltr');
      setLanguage(lng.startsWith('en') ? 'en' : 'fa');
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
      document.documentElement.lang = lng;
    };

    handleChange(i18n.language);
    i18n.on('languageChanged', handleChange);
    return () => {
      i18n.off('languageChanged', handleChange);
    };
  }, [i18n]);

  return (
    <DirectionProvider direction={direction} language={language}>
      {children}
    </DirectionProvider>
  );
}
