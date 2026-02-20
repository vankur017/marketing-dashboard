import React, { memo } from 'react';
import {
    AreaChart, Area, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-xl p-3 text-sm">
            <p className="font-semibold text-slate-700 mb-1">{label}</p>
            <p className="text-xs font-medium text-indigo-500">
                Revenue: <span className="font-bold">${payload[0]?.value.toLocaleString()}</span>
            </p>
            {payload[1] && (
                <p className="text-xs font-medium text-emerald-500">
                    Growth: <span className="font-bold">{payload[1]?.value}%</span>
                </p>
            )}
        </div>
    );
};

const RevenueGrowthChart = memo(({ data, loading }) => {
    if (loading) {
        return <div className="h-72 w-full skeleton rounded-2xl" />;
    }

    return (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-800 tracking-wide">Revenue Growth</h4>
                <p className="text-xs text-slate-400 mt-0.5">Cumulative revenue &amp; growth rate</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                    <defs>
                        <linearGradient id="gradCumRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gradGrowth" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#gradCumRev)" dot={false} activeDot={{ r: 5 }} />
                    <Area type="monotone" dataKey="growth" name="Growth %" stroke="#10b981" strokeWidth={2} fill="url(#gradGrowth)" dot={false} activeDot={{ r: 4 }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
});

RevenueGrowthChart.displayName = 'RevenueGrowthChart';
export default RevenueGrowthChart;
