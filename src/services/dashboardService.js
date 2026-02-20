import { mockDataByTimeframe } from '../data/mockData';

/**
 * Simulates an API call with a realistic delay.
 * Filters data based on requested timeframe (week | month | year).
 */
export const fetchDashboardData = (timeframe = 'month') => {
  return new Promise((resolve) => {
    const delay = 800 + Math.random() * 400; // 800–1200 ms
    setTimeout(() => {
      resolve(mockDataByTimeframe[timeframe] ?? mockDataByTimeframe.month);
    }, delay);
  });
};