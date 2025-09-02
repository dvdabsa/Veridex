import type { Plan, Expense, Invoice } from './types';

export const PLANS: Plan[] = [
  {
    name: 'Basic',
    priceIdMonth: 'price_1S2iFQIfKoS8tHCkEdM1jwM3',
    priceIdYear: 'price_1S2iGcIfKoS8tHCkVIpCvLm7',
    priceMonth: 10,
    priceYear: 100,
    features: [
      'Expense tracking',
      'Invoice generation',
      'Financial summaries',
      'Basic reporting',
    ],
    isPopular: false,
  },
  {
    name: 'Pro',
    priceIdMonth: 'price_1S2iHiIfKoS8tHCkRYzzMAGn',
    priceIdYear: 'price_1S2iICIfKoS8tHCk4aUCouTm',
    priceMonth: 20,
    priceYear: 200,
    features: [
      'All Basic features',
      'AI-driven financial advice',
      'Forecasting & tax optimization',
      'Smart business insights',
      'Personalized recommendations',
    ],
    isPopular: true,
  },
];

export const MOCK_EXPENSES: Expense[] = [
    { id: 'exp1', description: 'Office Supplies', category: 'Office', amount: 150.00, date: '2024-07-28', status: 'Paid' },
    { id: 'exp2', description: 'Cloud Server Subscription', category: 'Software', amount: 55.00, date: '2024-07-25', status: 'Paid' },
    { id: 'exp3', description: 'Client Lunch Meeting', category: 'Meals', amount: 85.50, date: '2024-07-22', status: 'Paid' },
    { id: 'exp4', description: 'Marketing Campaign', category: 'Marketing', amount: 1200.00, date: '2024-08-01', status: 'Pending' },
];

export const MOCK_INVOICES: Invoice[] = [
    { id: 'inv1', customer: 'Innovate Corp', amount: 5000, dueDate: '2024-08-15', status: 'Sent' },
    { id: 'inv2', customer: 'Future Tech', amount: 3500, dueDate: '2024-07-20', status: 'Paid' },
    { id: 'inv3', customer: 'Synergy Solutions', amount: 7200, dueDate: '2024-08-30', status: 'Draft' },
];
