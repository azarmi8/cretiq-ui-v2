/**
 * NotificationsButton — Bell with unread indicator
 */

import { Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export function NotificationsButton({ count = 0 }: { count?: number }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#45D483]/30 flex items-center justify-center transition-all duration-200"
    >
      <Bell className="w-4 h-4 text-[#94A3B8]" />
      {count > 0 && (
        <span className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-[#FF5C67] shadow-[0_0_8px_rgba(255,92,103,0.6)]" />
      )}
    </motion.button>
  );
}
