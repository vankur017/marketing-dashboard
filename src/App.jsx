import React from 'react';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
