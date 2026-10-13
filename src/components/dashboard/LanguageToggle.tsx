/**
 * LanguageToggle — FA/EN language switcher
 * Uses i18next + design system primitives
 */

import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'fa';

  const toggle = () => {
    i18n.changeLanguage(currentLang === 'fa' ? 'en' : 'fa');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggle}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#45D483]/30 transition-all duration-200"
    >
      <Globe className="w-4 h-4 text-[#45D483]" />
      <span className="text-xs font-medium text-[#E7F7F8] font-mono">
        {currentLang === 'fa' ? 'EN' : 'FA'}
      </span>
    </motion.button>
  );
}
