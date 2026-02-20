import { useState, useEffect, useMemo } from 'react';
import { fetchDashboardData } from '../services/dashboardService';

export const useDashboardData = (timeframe) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchDashboardData(timeframe).then(res => {
            setData(res);
            setLoading(false);
        });
    }, [timeframe]);

    const memoizedData = useMemo(() => data, [data]);

    return { data: memoizedData, loading };
};