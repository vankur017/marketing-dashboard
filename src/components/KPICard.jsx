import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';

const iconMap = {
    'Total Revenue': '💰',
    'Active Users': '👥',
    'Page Views': '📈',
    'Month Sales': '🛒',
    'Year Sales': '🏆',
};

const KPICard = memo(({ title, value, change, trend, loading, index = 0 }) => {
    const animatedValue = useCountUp(value);

    if (loading) {
        return (
            <div className="p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl">
                <div className="skeleton h-4 w-24 rounded mb-3" />
                <div className="skeleton h-7 w-32 rounded mb-3" />
                <div className="skeleton h-3 w-20 rounded" />
            </div>
        );
    }

    const isUp = trend === 'up';

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.07, ease: 'easeOut' }}
            whileHover={{ y: -4, boxShadow: '0 12px 28px -8px rgba(99,102,241,0.2)' }}
            className="p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm cursor-default overflow-hidden relative group"
        >
            {/* Accent blob on hover */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-start justify-between mb-3 relative z-10">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
                <span className="text-lg">{iconMap[title] ?? '📊'}</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight relative z-10 tabular-nums">
                {animatedValue}
            </h3>

            <div className={`mt-3 flex items-center gap-1 text-xs font-semibold ${isUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'} relative z-10`}>
                <span className={`flex items-center justify-center w-5 h-5 rounded-full ${isUp ? 'bg-emerald-50 dark:bg-emerald-900/30' : 'bg-rose-50 dark:bg-rose-900/30'}`}>
                    {isUp ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                </span>
                {change}
                <span className="ml-1 text-slate-400 font-normal text-[10px] uppercase tracking-wide">vs last period</span>
            </div>
        </motion.div>
    );
});

KPICard.displayName = 'KPICard';
export default KPICard;