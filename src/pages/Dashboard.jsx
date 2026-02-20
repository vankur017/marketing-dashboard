import React, { lazy, Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardData } from '../hooks/useDashboardData';
import KPICard from '../components/KPICard';

// ── Lazy-loaded chart components ──────────────────────────────────────────────
const SalesOverviewChart = lazy(() => import('../components/charts/SalesOverviewChart'));
const ActiveUsersTrendChart = lazy(() => import('../components/charts/ActiveUsersTrendChart'));
const PageVisitsTrendChart = lazy(() => import('../components/charts/PageVisitsTrendChart'));
const RevenueGrowthChart = lazy(() => import('../components/charts/RevenueGrowthChart'));
const DeviceDistributionChart = lazy(() => import('../components/charts/DeviceDistributionChart'));

// ── Skeleton placeholder for lazy chart boundary ─────────────────────────────
const ChartSkeleton = ({ h = 'h-72' }) => (
    <div className={`${h} w-full skeleton rounded-2xl`} />
);

// ── Filter button definition ──────────────────────────────────────────────────
const FILTERS = [
    { label: 'Last 7 Days', value: 'week' },
    { label: 'Last Month', value: 'month' },
    { label: 'This Year', value: 'year' },
];

const Dashboard = () => {
    const [timeframe, setTimeframe] = useState('month');
    const { data, loading } = useDashboardData(timeframe);

    const kpis = [
        { key: 'totalRevenue', title: 'Total Revenue' },
        { key: 'activeUsers', title: 'Active Users' },
        { key: 'pageViews', title: 'Page Views' },
        { key: 'currentMonthSales', title: 'Month Sales' },
        { key: 'currentYearSales', title: 'Year Sales' },
    ];

    return (
        <main className="min-h-screen bg-[#f0f4f8]">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

                {/* ── Page heading + Filter row ───────────────────────── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="text-2xl font-extrabold text-slate-900 tracking-tight"
                        >
                            Marketing Overview
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="text-sm text-slate-500 mt-1"
                        >
                            Welcome back 👋&nbsp; Here's what's happening today.
                        </motion.p>
                    </div>

                    {/* Date filter pills */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.15 }}
                        className="flex items-center gap-1 bg-white border border-slate-100 p-1 rounded-xl shadow-sm"
                    >
                        {FILTERS.map((f) => (
                            <button
                                key={f.value}
                                onClick={() => setTimeframe(f.value)}
                                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${timeframe === f.value
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                    }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* ── KPI Grid ────────────────────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
                    {kpis.map(({ key, title }, i) => (
                        <KPICard
                            key={key}
                            title={title}
                            value={data?.kpis[key]?.value}
                            change={data?.kpis[key]?.change}
                            trend={data?.kpis[key]?.trend}
                            loading={loading}
                            index={i}
                        />
                    ))}
                </div>

                {/* ── Row 1: Sales Overview (wide) + Device Distribution ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={timeframe}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
                            <div className="lg:col-span-2">
                                <Suspense fallback={<ChartSkeleton h="h-80" />}>
                                    <SalesOverviewChart data={data?.salesOverview} loading={loading} />
                                </Suspense>
                            </div>
                            <div className="lg:col-span-1">
                                <Suspense fallback={<ChartSkeleton h="h-80" />}>
                                    <DeviceDistributionChart data={data?.deviceDistribution} loading={loading} />
                                </Suspense>
                            </div>
                        </div>

                        {/* ── Row 2: Three medium charts ───────────────────── */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                            <Suspense fallback={<ChartSkeleton />}>
                                <ActiveUsersTrendChart data={data?.activeUsersTrend} loading={loading} />
                            </Suspense>
                            <Suspense fallback={<ChartSkeleton />}>
                                <PageVisitsTrendChart data={data?.pageVisitsTrend} loading={loading} />
                            </Suspense>
                            <Suspense fallback={<ChartSkeleton />}>
                                <RevenueGrowthChart data={data?.revenueGrowth} loading={loading} />
                            </Suspense>
                        </div>

                        {/* ── Row 3: Promo + Quick Stats cards ─────────────── */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {/* Promo banner */}
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white flex flex-col justify-between min-h-[140px]">
                                <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-white/10 rounded-full blur-3xl" />
                                <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl" />
                                <div className="relative z-10">
                                    <span className="text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full">🚀 Pro Feature</span>
                                    <h4 className="font-bold text-lg mt-3 leading-snug">Grow your reach with AI insights</h4>
                                    <p className="text-indigo-200 text-xs mt-1">Automate reports &amp; discover growth opportunities.</p>
                                </div>
                                <button className="relative z-10 mt-4 bg-white text-indigo-700 text-xs font-bold px-4 py-2 rounded-xl w-fit hover:bg-indigo-50 transition-colors shadow">
                                    Upgrade to Pro →
                                </button>
                            </div>

                            {/* Quick stat: conversion */}
                            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 flex flex-col justify-between min-h-[140px]">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Conversion Rate</p>
                                    <span className="text-lg">🎯</span>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-extrabold text-slate-900">3.68%</h3>
                                    <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: '36.8%' }}
                                            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                                        />
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-1.5">36.8% of industry avg (10%)</p>
                                </div>
                            </div>

                            {/* Quick stat: avg session */}
                            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 flex flex-col justify-between min-h-[140px]">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Avg Session</p>
                                    <span className="text-lg">⏱️</span>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-extrabold text-slate-900">4m 23s</h3>
                                    <div className="mt-3 grid grid-cols-7 gap-0.5 h-8 items-end">
                                        {[60, 80, 55, 90, 70, 95, 75].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                className="bg-indigo-100 rounded-sm"
                                                style={{ height: `${h}%` }}
                                                initial={{ scaleY: 0 }}
                                                animate={{ scaleY: 1 }}
                                                transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-1.5">+0.5% vs last period</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    );
};

export default Dashboard;
