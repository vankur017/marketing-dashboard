import React, { useState } from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import KPICard from '../components/KPICard';
import SalesChart from '../components/charts/SalesChart';
import { Calendar, Filter, Download } from 'lucide-react';

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('month');
  const { data, loading } = useDashboardData(timeframe);

  const filters = [
    { label: 'Last 7 Days', value: 'week' },
    { label: 'Last 30 Days', value: 'month' },
    { label: 'This Year', value: 'year' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Marketing Overview</h1>
          <p className="text-slate-500 text-sm">Welcome back, here's what's happening today.</p>
        </div>

        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setTimeframe(f.value)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                timeframe === f.value 
                ? 'bg-slate-900 text-white shadow-md' 
                : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <KPICard title="Total Revenue" value={data?.kpis.totalRevenue.value} change={data?.kpis.totalRevenue.change} trend={data?.kpis.totalRevenue.trend} loading={loading} />
        <KPICard title="Active Users" value={data?.kpis.activeUsers.value} change={data?.kpis.activeUsers.change} trend={data?.kpis.activeUsers.trend} loading={loading} />
        <KPICard title="Page Views" value={data?.kpis.pageViews.value} change={data?.kpis.pageViews.change} trend={data?.kpis.pageViews.trend} loading={loading} />
        <KPICard title="Month Sales" value={data?.kpis.currentMonthSales.value} change={data?.kpis.currentMonthSales.change} trend={data?.kpis.currentMonthSales.trend} loading={loading} />
        <KPICard title="Year Sales" value={data?.kpis.currentYearSales.value} change={data?.kpis.currentYearSales.change} trend={data?.kpis.currentYearSales.trend} loading={loading} />
      </div>

      {/* Main Charts Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={data?.salesOverview} loading={loading} />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Secondary smaller charts or info cards could go here */}
          <div className="flex-1 bg-indigo-600 rounded-2xl p-6 text-white flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-2">Grow your reach</h4>
              <p className="text-indigo-100 text-sm">Automate your social media posting with our AI tools.</p>
            </div>
            <button className="relative z-10 mt-4 bg-white text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold w-fit hover:bg-indigo-50 transition-colors">
              Upgrade Pro
            </button>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;