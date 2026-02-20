import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { activityEvents } from '../data/mockData';

function timeLabel(date) {
    const diff = Math.floor((Date.now() - date) / 1000);
    if (diff < 10) return 'just now';
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
}

const typeColors = {
    sale: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    signup: 'bg-indigo-50  text-indigo-600  dark:bg-indigo-900/30  dark:text-indigo-400',
    spike: 'bg-amber-50   text-amber-600   dark:bg-amber-900/30   dark:text-amber-400',
    goal: 'bg-violet-50  text-violet-600  dark:bg-violet-900/30  dark:text-violet-400',
    email: 'bg-blue-50    text-blue-600    dark:bg-blue-900/30    dark:text-blue-400',
};

const ActivityFeed = memo(() => {
    const [events, setEvents] = useState(() =>
        // Seed with 5 initial events spread across the last few mins
        activityEvents.slice(0, 5).map((e, i) => ({
            ...e,
            id: Date.now() - i * 90000,
            ts: new Date(Date.now() - i * 90000),
        }))
    );

    // Tick to refresh time labels
    const [, setTick] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setTick(n => n + 1), 10000);
        return () => clearInterval(t);
    }, []);

    // Inject a new random event every ~8s
    useEffect(() => {
        const t = setInterval(() => {
            const pool = activityEvents;
            const evt = pool[Math.floor(Math.random() * pool.length)];
            setEvents(prev => [
                { ...evt, id: Date.now(), ts: new Date() },
                ...prev.slice(0, 7),   // keep max 8 in list
            ]);
        }, 8000);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 tracking-wide">Live Activity</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Real-time events stream</p>
                </div>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    Live
                </span>
            </div>

            <div className="space-y-2 overflow-hidden">
                <AnimatePresence initial={false}>
                    {events.map(evt => (
                        <motion.div
                            key={evt.id}
                            initial={{ opacity: 0, y: -16, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
                        >
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${typeColors[evt.type] ?? ''}`}>
                                {evt.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-snug truncate">{evt.msg}</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">{timeLabel(evt.ts)}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
});

ActivityFeed.displayName = 'ActivityFeed';
export default ActivityFeed;
