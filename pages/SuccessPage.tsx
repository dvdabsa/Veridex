
import React from 'react';
import { CheckIcon } from '../components/icons';

interface SuccessPageProps {
  setPage: (page: 'dashboard' | 'home' | 'login' | 'success') => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ setPage }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-primary animate-fade-in">
      <div className="w-full max-w-md p-8 text-center bg-brand-secondary rounded-2xl shadow-lg border border-slate-700">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckIcon className="w-10 h-10 text-green-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white">Payment Successful!</h1>
        <p className="mt-4 text-brand-text-secondary">
          Thank you for subscribing to Veridex. Your plan has been activated.
        </p>
        <button
          onClick={() => {
              // Clear the URL parameter before navigating to avoid re-triggering the success page on refresh
              window.history.pushState({}, '', window.location.pathname);
              setPage('dashboard');
          }}
          className="mt-8 w-full py-3 px-6 text-base font-semibold rounded-lg bg-brand-accent hover:bg-brand-accent-hover text-white transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
