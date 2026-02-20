import { useState, useEffect, useCallback } from 'react';

/**
 * Nudges KPI values by ±1-3% every `interval` ms to simulate live data.
 * Returns { liveKpis, lastUpdated, refresh, isRefreshing }.
 */
export function useLiveRefresh(baseKpis, interval = 30000) {
    const [liveKpis, setLiveKpis] = useState(baseKpis);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Nudge a display string by a small percentage
    const nudge = (displayStr) => {
        if (!displayStr) return displayStr;
        const s = String(displayStr);
        let prefix = '', suffix = '', core = s;
        if (core.startsWith('$')) { prefix = '$'; core = core.slice(1); }
        if (core.endsWith('M')) { suffix = 'M'; core = core.slice(0, -1); }
        if (core.endsWith('K')) { suffix = 'K'; core = core.slice(0, -1); }
        const raw = parseFloat(core.replace(/,/g, '')) || 0;
        const factor = 1 + (Math.random() * 0.04 - 0.02); // ±2%
        const nudged = raw * factor;
        const formatted = suffix === 'M'
            ? nudged.toFixed(2)
            : Math.round(nudged).toLocaleString('en-US');
        return `${prefix}${formatted}${suffix}`;
    };

    const applyNudge = useCallback((kpis) => {
        if (!kpis) return kpis;
        const result = {};
        Object.entries(kpis).forEach(([key, entry]) => {
            result[key] = { ...entry, value: nudge(entry.value) };
        });
        return result;
    }, []);

    // Initial sync when baseKpis changes (timeframe switch)
    useEffect(() => {
        setLiveKpis(baseKpis);
    }, [baseKpis]);

    // Auto-refresh ticker
    useEffect(() => {
        const timer = setInterval(() => {
            setLiveKpis(prev => applyNudge(prev));
            setLastUpdated(new Date());
        }, interval);
        return () => clearInterval(timer);
    }, [interval, applyNudge]);

    // Manual refresh
    const refresh = useCallback(() => {
        setIsRefreshing(true);
        setTimeout(() => {
            setLiveKpis(prev => applyNudge(prev));
            setLastUpdated(new Date());
            setIsRefreshing(false);
        }, 600);
    }, [applyNudge]);

    // Human-readable "Updated X ago"
    const timeAgo = (() => {
        const diff = Math.floor((new Date() - lastUpdated) / 1000);
        if (diff < 5) return 'just now';
        if (diff < 60) return `${diff}s ago`;
        return `${Math.floor(diff / 60)}m ago`;
    })();

    return { liveKpis, lastUpdated, timeAgo, refresh, isRefreshing };
}
