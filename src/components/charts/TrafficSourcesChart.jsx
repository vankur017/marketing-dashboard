import React, { memo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Cell,
    Tooltip, ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl p-3 text-sm">
            <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                <span className="font-semibold text-slate-700 dark:text-slate-200">{d.name}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
                Share: <span className="font-bold text-slate-800 dark:text-slate-100">{d.value}%</span>
            </p>
        </div>
    );
};

const TrafficSourcesChart = memo(({ data, loading }) => {
    if (loading) {
        return <div className="h-72 w-full skeleton rounded-2xl" />;
    }

    // Recharts needs a numeric key; we use `value`
    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm p-6">
            <div className="mb-5">
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 tracking-wide">Traffic Sources</h4>
                <p className="text-xs text-slate-400 mt-0.5">Breakdown by acquisition channel</p>
            </div>
            <ResponsiveContainer width="100%" height={190}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
                    barCategoryGap="25%"
                >
                    <XAxis
                        type="number"
                        domain={[0, 100]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 11 }}
                        unit="%"
                    />
                    <YAxis
                        type="category"
                        dataKey="name"
                        width={110}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 11 }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={14}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
                {data.map(item => (
                    <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{item.name}</span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{item.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
});

TrafficSourcesChart.displayName = 'TrafficSourcesChart';
export default TrafficSourcesChart;
