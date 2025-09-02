
import React, { useState, useMemo, useEffect } from 'react';
import { AuthContext, User } from './context/AuthContext';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<'home' | 'login' | 'dashboard' | 'success'>('home');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      // For this demo, we assume a successful payment should log the user in
      // if they aren't already, and then show the success page.
      if (!user) {
        // In a real app, user session would be handled by the backend after payment.
        setUser({ name: 'Demo User', email: 'demo@veridex.ai', subscription: 'Pro' });
      }
      setPage('success');
    }
  }, []); // Note: Empty dependency array means this runs only once on initial mount.

  const login = (email: string) => {
    setUser({ name: 'Demo User', email: email, subscription: 'Pro' });
    setPage('dashboard');
  };

  const logout = () => {
    setUser(null);
    setPage('home');
  };

  const authContextValue = useMemo(() => ({ user, login, logout }), [user]);

  const renderPage = () => {
    if (page === 'success') {
      return <SuccessPage setPage={setPage} />;
    }
    if (page === 'dashboard' && user) {
      return <DashboardPage />;
    }
    if (page === 'login') {
      return <LoginPage setPage={setPage} />;
    }
    return <HomePage setPage={setPage} />;
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <div className="min-h-screen bg-brand-primary text-brand-text font-sans">
        {renderPage()}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
