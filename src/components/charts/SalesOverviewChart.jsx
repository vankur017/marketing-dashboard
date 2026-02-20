import React, { useState, memo } from 'react';
import {
    AreaChart, Area, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-xl p-3 text-sm">
            <p className="font-semibold text-slate-700 mb-1">{label}</p>
            {payload.map((p) => (
                <p key={p.dataKey} style={{ color: p.color }} className="text-xs font-medium">
                    {p.name}: <span className="font-bold">${p.value.toLocaleString()}</span>
                </p>
            ))}
        </div>
    );
};

const SalesOverviewChart = memo(({ data, loading }) => {
    const [mode, setMode] = useState('area');

    if (loading) {
        return <div className="h-80 w-full skeleton rounded-2xl" />;
    }

    return (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h4 className="text-sm font-semibold text-slate-800 tracking-wide">Sales Overview</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Revenue vs Sales comparison</p>
                </div>
                <div className="flex gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100">
                    {['area', 'line'].map((m) => (
                        <button
                            key={m}
                            onClick={() => setMode(m)}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all capitalize ${mode === m
                                    ? 'bg-white text-slate-800 shadow-sm'
                                    : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {m === 'area' ? 'Area' : 'Line'}
                        </button>
                    ))}
                </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
                {mode === 'area' ? (
                    <AreaChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="gradSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }} />
                        <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#gradRevenue)" dot={false} activeDot={{ r: 5 }} />
                        <Area type="monotone" dataKey="sales" name="Sales" stroke="#a78bfa" strokeWidth={2.5} fill="url(#gradSales)" dot={false} activeDot={{ r: 5 }} />
                    </AreaChart>
                ) : (
                    <LineChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }} />
                        <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                        <Line type="monotone" dataKey="sales" name="Sales" stroke="#a78bfa" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                    </LineChart>
                )}
            </ResponsiveContainer>
        </div>
    );
});

SalesOverviewChart.displayName = 'SalesOverviewChart';
export default SalesOverviewChart;
