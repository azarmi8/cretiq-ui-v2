/**
 * UserMenu — User avatar + dropdown trigger
 * Prototype: static user info. Will be replaced by auth in production.
 */

import { ChevronDown } from 'lucide-react';

export function UserMenu() {
  return (
    <button className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#45D483]/30 transition-all duration-200">
      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#45D483] to-[#2DE2E6] flex items-center justify-center text-[#0B1117] text-xs font-bold">
        A
      </div>
      <div className="text-right hidden md:block">
        <div className="text-xs font-medium text-[#E7F7F8] leading-tight">
          آزرمی
        </div>
        <div className="text-[10px] text-[#475569] leading-tight">
          مدیر کنترل کیفیت
        </div>
      </div>
      <ChevronDown className="w-3 h-3 text-[#475569]" />
    </button>
  );
}
