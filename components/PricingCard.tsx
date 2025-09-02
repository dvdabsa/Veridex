
import React from 'react';
import type { Plan } from '../types';
import { CheckIcon } from './icons';
import { redirectToCheckout } from '../services/stripe';

interface PricingCardProps {
  plan: Plan;
  billingCycle: 'month' | 'year';
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, billingCycle }) => {
  const price = billingCycle === 'month' ? plan.priceMonth : plan.priceYear;
  const priceId = billingCycle === 'month' ? plan.priceIdMonth : plan.priceIdYear;

  const handleSubscribe = () => {
    redirectToCheckout(priceId);
  };

  return (
    <div className={`relative flex flex-col p-8 bg-brand-secondary rounded-2xl shadow-lg border ${plan.isPopular ? 'border-brand-accent' : 'border-slate-700'} transform hover:-translate-y-2 transition-transform duration-300`}>
      {plan.isPopular && (
        <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
            <span className="bg-brand-accent text-white text-xs font-semibold px-4 py-1 rounded-full uppercase">Most Popular</span>
        </div>
      )}
      <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
      <p className="mt-4 text-brand-text-secondary">For individuals and small teams.</p>
      <div className="mt-6">
        <span className="text-5xl font-bold tracking-tight text-white">${price}</span>
        <span className="text-base font-medium text-brand-text-secondary">/{billingCycle}</span>
      </div>
      <button
        onClick={handleSubscribe}
        className={`mt-8 w-full py-3 px-6 text-base font-semibold rounded-lg transition-colors ${plan.isPopular ? 'bg-brand-accent hover:bg-brand-accent-hover text-white' : 'bg-slate-700 hover:bg-slate-600 text-brand-text'}`}
      >
        Subscribe Now
      </button>
      <ul role="list" className="mt-8 space-y-4 text-sm leading-6 text-brand-text-secondary">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-brand-accent" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
