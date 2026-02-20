import React from 'react';
import { ThemeProvider } from './hooks/useTheme';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import './index.css';

// Header needs refresh props — lift them from Dashboard via a shared state
// We use a render-prop-like pattern via a wrapper ref so Header + Dashboard share the same useLiveRefresh instance
import { useState, useRef, useCallback } from 'react';

function App() {
  // We pass a ref-like object that Dashboard fills with its refresh control
  const refreshRef = useRef({ refresh: null, isRefreshing: false, timeAgo: 'just now' });
  const [headerState, setHeaderState] = useState({ isRefreshing: false, timeAgo: 'just now' });

  const onRefresh = useCallback(() => {
    refreshRef.current?.refresh?.();
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col relative z-10">
        <Header
          onRefresh={onRefresh}
          isRefreshing={headerState.isRefreshing}
          timeAgo={headerState.timeAgo}
        />
        <Dashboard refreshRef={refreshRef} onStateChange={setHeaderState} />
      </div>
    </ThemeProvider>
  );
}

export default App;
