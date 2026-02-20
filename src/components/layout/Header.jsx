import React, { memo } from 'react';
import { BarChart3, Bell, Search, Moon, Sun, RefreshCw } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const Header = memo(({ onRefresh, isRefreshing, timeAgo }) => {
    const { dark, toggle } = useTheme();

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    return (
        <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 shadow-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">

                {/* Logo */}
                <div className="flex items-center gap-2.5 flex-shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
                        <BarChart3 size={16} className="text-white" />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm hidden sm:block">Analytica</span>
                </div>

                {/* Search bar */}
                <div className="flex-1 max-w-xs hidden md:flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-3 py-2">
                    <Search size={14} className="text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search metrics..."
                        className="bg-transparent text-xs text-slate-600 dark:text-slate-300 placeholder-slate-400 outline-none w-full"
                        readOnly
                    />
                    <kbd className="hidden sm:block text-[10px] text-slate-300 dark:text-slate-600 font-mono bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">⌘K</kbd>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2">
                    {/* Date */}
                    <p className="text-xs text-slate-400 dark:text-slate-500 hidden lg:block">{dateStr}</p>

                    {/* Live indicator + refresh */}
                    {timeAgo && (
                        <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg px-2.5 py-1.5">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                            </span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">Updated {timeAgo}</span>
                        </div>
                    )}

                    {/* Refresh */}
                    {onRefresh && (
                        <button
                            onClick={onRefresh}
                            title="Refresh data"
                            className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all text-slate-500 dark:text-slate-400"
                        >
                            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
                        </button>
                    )}

                    {/* Notification bell */}
                    <button className="relative w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-500 dark:text-slate-400">
                        <Bell size={15} />
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    </button>

                    {/* Dark mode toggle */}
                    <button
                        onClick={toggle}
                        title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                        className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center hover:bg-amber-50 dark:hover:bg-indigo-900/30 hover:border-amber-200 dark:hover:border-indigo-600 hover:text-amber-500 dark:hover:text-indigo-400 transition-all text-slate-500 dark:text-slate-400"
                    >
                        {dark ? <Sun size={15} /> : <Moon size={15} />}
                    </button>

                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        A
                    </div>
                </div>
            </div>
        </header>
    );
});

Header.displayName = 'Header';
export default Header;
