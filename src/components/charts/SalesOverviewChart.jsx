import React, { useState, memo } from 'react';
import {
    AreaChart, Area, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend, ReferenceLine,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl p-3 text-sm min-w-[140px]">
            <p className="font-semibold text-slate-700 dark:text-slate-200 mb-2 pb-1.5 border-b border-slate-100 dark:border-slate-700">{label}</p>
            {payload.map((p) => p.dataKey !== 'target' && (
                <div key={p.dataKey} className="flex items-center justify-between gap-4 mb-1">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                        <span className="text-xs text-slate-500 dark:text-slate-400">{p.name}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                        ${p.value.toLocaleString()}
                    </span>
                </div>
            ))}
        </div>
    );
};

const SalesOverviewChart = memo(({ data, loading }) => {
    const [mode, setMode] = useState('area');

    if (loading) {
        return <div className="h-[360px] w-full skeleton rounded-2xl" />;
    }

    // Check if data has target field
    const hasTarget = data?.some(d => d.target);

    const chartProps = {
        data,
        margin: { top: 8, right: 4, left: -10, bottom: 0 },
    };

    const axisProps = {
        XAxis: { dataKey: 'name', axisLine: false, tickLine: false, tick: { fill: '#94a3b8', fontSize: 11 } },
        YAxis: { axisLine: false, tickLine: false, tick: { fill: '#94a3b8', fontSize: 11 } },
    };

    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm p-6 h-[360px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 tracking-wide">Sales Overview</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Revenue vs Sales · dashed line = target</p>
                </div>
                <div className="flex gap-1 bg-slate-50 dark:bg-slate-700 p-1 rounded-lg border border-slate-100 dark:border-slate-600">
                    {['area', 'line'].map((m) => (
                        <button
                            key={m}
                            onClick={() => setMode(m)}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all capitalize ${mode === m
                                    ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-slate-100 shadow-sm'
                                    : 'text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                }`}
                        >
                            {m === 'area' ? 'Area' : 'Line'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    {mode === 'area' ? (
                        <AreaChart {...chartProps}>
                            <defs>
                                <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.18} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="gradSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis {...axisProps.XAxis} />
                            <YAxis {...axisProps.YAxis} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
                            {hasTarget && (
                                <ReferenceLine
                                    y={data[0]?.target}
                                    stroke="#f59e0b"
                                    strokeDasharray="5 4"
                                    strokeWidth={1.5}
                                    label={{ value: 'Target', position: 'insideTopRight', fill: '#f59e0b', fontSize: 10 }}
                                />
                            )}
                            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#gradRevenue)" dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
                            <Area type="monotone" dataKey="sales" name="Sales" stroke="#a78bfa" strokeWidth={2.5} fill="url(#gradSales)" dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
                        </AreaChart>
                    ) : (
                        <LineChart {...chartProps}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis {...axisProps.XAxis} />
                            <YAxis {...axisProps.YAxis} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
                            {hasTarget && (
                                <ReferenceLine
                                    y={data[0]?.target}
                                    stroke="#f59e0b"
                                    strokeDasharray="5 4"
                                    strokeWidth={1.5}
                                    label={{ value: 'Target', position: 'insideTopRight', fill: '#f59e0b', fontSize: 10 }}
                                />
                            )}
                            <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2.5} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
                            <Line type="monotone" dataKey="sales" name="Sales" stroke="#a78bfa" strokeWidth={2.5} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
});

SalesOverviewChart.displayName = 'SalesOverviewChart';
export default SalesOverviewChart;
