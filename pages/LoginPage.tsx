
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { VeridexLogo } from '../components/icons';

interface LoginPageProps {
  setPage: (page: 'home' | 'dashboard') => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setPage }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('demo@veridex.ai');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate credentials against a backend.
    // Here, we just log in the user with the provided email.
    if (email) {
      login(email);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-primary">
      <div className="w-full max-w-md p-8 space-y-8 bg-brand-secondary rounded-2xl shadow-lg border border-slate-700">
        <div className="text-center">
          <div className="flex justify-center mb-4">
             <VeridexLogo className="h-12 w-12 text-brand-accent" />
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome to Veridex</h1>
          <p className="mt-2 text-brand-text-secondary">Sign in to access your dashboard</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-600 bg-slate-800 text-white placeholder-brand-text-secondary focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm rounded-t-md"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-600 bg-slate-800 text-white placeholder-brand-text-secondary focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm rounded-b-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Feature not implemented in demo."); }} className="font-medium text-brand-accent hover:text-brand-accent-hover">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-accent hover:bg-brand-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent focus:ring-offset-brand-secondary"
            >
              Sign in
            </button>
          </div>
        </form>
         <p className="text-center text-sm text-brand-text-secondary">
          Don't have an account?{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); setPage('home'); }} className="font-medium text-brand-accent hover:text-brand-accent-hover">
            Start a free trial
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
