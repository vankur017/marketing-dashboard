import React, { memo } from 'react';
import {
    PieChart, Pie, Cell, Tooltip,
    ResponsiveContainer, Legend,
} from 'recharts';

const RADIAN = Math.PI / 180;

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const { name, value, payload: p } = payload[0];
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-xl p-3 text-sm">
            <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                <span className="font-semibold text-slate-700">{name}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Share: <span className="font-bold">{value}%</span></p>
        </div>
    );
};

const DeviceDistributionChart = memo(({ data, loading }) => {
    if (loading) {
        return <div className="h-72 w-full skeleton rounded-2xl" />;
    }

    return (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
            <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-800 tracking-wide">Device Distribution</h4>
                <p className="text-xs text-slate-400 mt-0.5">Traffic split by device type</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                        labelLine={false}
                        label={renderCustomLabel}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
                    />
                </PieChart>
            </ResponsiveContainer>
            {/* Legend with explicit values */}
            <div className="mt-2 space-y-2">
                {data.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                            <span className="text-xs text-slate-600">{item.name}</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-800">{item.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
});

DeviceDistributionChart.displayName = 'DeviceDistributionChart';
export default DeviceDistributionChart;
