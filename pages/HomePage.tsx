
import React, { useState } from 'react';
import PricingCard from '../components/PricingCard';
import { VeridexLogo } from '../components/icons';
import { PLANS } from '../constants';

interface HomePageProps {
  setPage: (page: 'login' | 'dashboard' | 'home') => void;
}

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  const [billingCycle, setBillingCycle] = useState<'month' | 'year'>('month');

  return (
    <div className="bg-brand-primary">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
              <VeridexLogo className="h-8 w-auto text-brand-accent" />
              <span className="text-white font-bold text-2xl">Veridex</span>
            </a>
          </div>
          <div className="lg:flex lg:flex-1 lg:justify-end">
            <button onClick={() => setPage('login')} className="text-sm font-semibold leading-6 text-white hover:text-brand-accent transition-colors">
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </nav>
      </header>

      <main className="isolate">
        {/* Hero section */}
        <div className="relative pt-14">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2C62F6] to-[#7c3aed] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
          </div>
          <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl animate-fade-in">Futuristic AI-Powered Accounting</h1>
                <p className="mt-6 text-lg leading-8 text-brand-text-secondary animate-slide-in-up">Welcome to Veridex, your intelligent financial advisor. Automate your accounting, gain smart insights, and make data-driven decisions with the power of AI.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <button onClick={() => setPage('login')} className="rounded-md bg-brand-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors">Get started</button>
                  <a href="#pricing" className="text-sm font-semibold leading-6 text-white hover:text-brand-accent transition-colors">Learn more <span aria-hidden="true">→</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing section */}
        <div id="pricing" className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Simple, Transparent Pricing</h2>
            <p className="mt-6 text-lg leading-8 text-brand-text-secondary">Choose the plan that's right for your business. Cancel anytime.</p>
          </div>
          <div className="mt-16 flex justify-center">
            <div className="flex items-center rounded-full p-1 bg-brand-secondary">
              <button onClick={() => setBillingCycle('month')} className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${billingCycle === 'month' ? 'bg-brand-accent text-white' : 'text-brand-text-secondary'}`}>
                Monthly
              </button>
              <button onClick={() => setBillingCycle('year')} className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${billingCycle === 'year' ? 'bg-brand-accent text-white' : 'text-brand-text-secondary'}`}>
                Yearly
              </button>
            </div>
          </div>
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {PLANS.map((plan) => (
              <PricingCard key={plan.name} plan={plan} billingCycle={billingCycle} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
