import React, { useState, useMemo, memo } from 'react';
import { ArrowUp, ArrowDown, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

const COLS = [
    { key: 'page', label: 'Page', sortable: false },
    { key: 'views', label: 'Views', sortable: true },
    { key: 'avgTime', label: 'Avg Time', sortable: false },
    { key: 'bounce', label: 'Bounce Rate', sortable: true },
    { key: 'trend', label: 'Trend', sortable: false },
];

const TrendBadge = ({ trend }) => (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${trend === 'up'
            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
            : 'bg-rose-50 text-rose-500 dark:bg-rose-900/30 dark:text-rose-400'
        }`}>
        {trend === 'up' ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
        {trend === 'up' ? 'Up' : 'Down'}
    </span>
);

const SortIcon = ({ col, sortKey, sortDir }) => {
    if (col !== sortKey) return <ChevronsUpDown size={12} className="text-slate-300 dark:text-slate-600" />;
    return sortDir === 'asc'
        ? <ChevronUp size={12} className="text-indigo-500" />
        : <ChevronDown size={12} className="text-indigo-500" />;
};

const TopPagesTable = memo(({ data, loading }) => {
    const [sortKey, setSortKey] = useState('views');
    const [sortDir, setSortDir] = useState('desc');

    const sorted = useMemo(() => {
        if (!data) return [];
        return [...data].sort((a, b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];
            if (typeof aVal === 'number') {
                return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
            }
            return sortDir === 'asc'
                ? String(aVal).localeCompare(String(bVal))
                : String(bVal).localeCompare(String(aVal));
        });
    }, [data, sortKey, sortDir]);

    const handleSort = (key) => {
        if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortKey(key); setSortDir('desc'); }
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm p-6">
                <div className="skeleton h-4 w-32 rounded mb-6" />
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="skeleton h-10 w-full rounded mb-2" />
                ))}
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm p-6">
            <div className="mb-5">
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 tracking-wide">Top Pages</h4>
                <p className="text-xs text-slate-400 mt-0.5">Click column headers to sort</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-700">
                            {COLS.map(col => (
                                <th
                                    key={col.key}
                                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                                    className={`pb-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider pr-4 select-none ${col.sortable ? 'cursor-pointer hover:text-indigo-500 transition-colors' : ''
                                        }`}
                                >
                                    <span className="flex items-center gap-1">
                                        {col.label}
                                        {col.sortable && <SortIcon col={col.key} sortKey={sortKey} sortDir={sortDir} />}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((row, i) => (
                            <tr
                                key={row.page}
                                className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-indigo-50/40 dark:hover:bg-indigo-900/10 transition-colors group"
                            >
                                <td className="py-3 pr-4">
                                    <span className="font-mono text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {row.page}
                                    </span>
                                </td>
                                <td className="py-3 pr-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                                            {row.views.toLocaleString()}
                                        </span>
                                        {/* Mini bar */}
                                        <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-indigo-400 rounded-full"
                                                style={{ width: `${(row.views / sorted[0].views) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 pr-4 text-xs text-slate-600 dark:text-slate-400">{row.avgTime}</td>
                                <td className="py-3 pr-4">
                                    <span className={`text-xs font-semibold ${row.bounce < 30 ? 'text-emerald-600 dark:text-emerald-400'
                                            : row.bounce < 50 ? 'text-amber-500'
                                                : 'text-rose-500'
                                        }`}>
                                        {row.bounce}%
                                    </span>
                                </td>
                                <td className="py-3">
                                    <TrendBadge trend={row.trend} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

TopPagesTable.displayName = 'TopPagesTable';
export default TopPagesTable;
