import React, { memo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-xl p-3 text-sm">
            <p className="font-semibold text-slate-700 mb-1">{label}</p>
            {payload.map((p) => (
                <p key={p.dataKey} style={{ color: p.color }} className="text-xs font-medium">
                    {p.name}: <span className="font-bold">{p.value.toLocaleString()}</span>
                </p>
            ))}
        </div>
    );
};

const ActiveUsersTrendChart = memo(({ data, loading }) => {
    if (loading) {
        return <div className="h-72 w-full skeleton rounded-2xl" />;
    }

    return (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-800 tracking-wide">Active Users Trend</h4>
                <p className="text-xs text-slate-400 mt-0.5">Total vs new user acquisition</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data} barCategoryGap="30%" margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                    <defs>
                        <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                            <stop offset="100%" stopColor="#818cf8" stopOpacity={0.8} />
                        </linearGradient>
                        <linearGradient id="gradNew" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#c4b5fd" stopOpacity={1} />
                            <stop offset="100%" stopColor="#ddd6fe" stopOpacity={0.8} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
                    <Bar dataKey="users" name="Total Users" fill="url(#gradUsers)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="newUsers" name="New Users" fill="url(#gradNew)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
});

ActiveUsersTrendChart.displayName = 'ActiveUsersTrendChart';
export default ActiveUsersTrendChart;
