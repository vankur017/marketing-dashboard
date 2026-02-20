import React, { memo } from 'react';
import {
    LineChart, Line, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-xl p-3 text-sm">
            <p className="font-semibold text-slate-700 mb-1">{label}</p>
            {payload.map((p) => (
                <p key={p.dataKey} style={{ color: p.color }} className="text-xs font-medium">
                    {p.name}:{' '}
                    <span className="font-bold">
                        {p.dataKey === 'bounceRate' ? `${p.value}%` : p.value.toLocaleString()}
                    </span>
                </p>
            ))}
        </div>
    );
};

const PageVisitsTrendChart = memo(({ data, loading }) => {
    if (loading) {
        return <div className="h-72 w-full skeleton rounded-2xl" />;
    }

    return (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-800 tracking-wide">Page Visits Trend</h4>
                <p className="text-xs text-slate-400 mt-0.5">Page visits &amp; bounce rate over time</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
                <LineChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
                    <Line yAxisId="left" type="monotone" dataKey="visits" name="Page Visits" stroke="#10b981" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                    <Line yAxisId="right" type="monotone" dataKey="bounceRate" name="Bounce Rate" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 3" dot={false} activeDot={{ r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
});

PageVisitsTrendChart.displayName = 'PageVisitsTrendChart';
export default PageVisitsTrendChart;
