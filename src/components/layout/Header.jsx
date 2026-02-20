import React, { memo } from 'react';
import { BarChart3, Bell, Search, Settings } from 'lucide-react';

const Header = memo(() => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <div className="flex items-center gap-2.5 flex-shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
                        <BarChart3 size={16} className="text-white" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm hidden sm:block">Analytica</span>
                </div>

                {/* Search bar */}
                <div className="flex-1 max-w-xs hidden md:flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                    <Search size={14} className="text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search metrics..."
                        className="bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none w-full"
                        readOnly
                    />
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    <p className="text-xs text-slate-400 hidden lg:block">{dateStr}</p>
                    <button className="relative w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-slate-100 transition-colors">
                        <Bell size={15} className="text-slate-500" />
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                    </button>
                    <button className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-slate-100 transition-colors">
                        <Settings size={15} className="text-slate-500" />
                    </button>
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                        A
                    </div>
                </div>
            </div>
        </header>
    );
});

Header.displayName = 'Header';
export default Header;
