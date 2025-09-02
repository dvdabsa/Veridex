
export interface Plan {
  name: string;
  priceIdMonth: string;
  priceIdYear: string;
  priceMonth: number;
  priceYear: number;
  features: string[];
  isPopular: boolean;
}

export interface Expense {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending';
}

export interface Invoice {
  id: string;
  customer: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Sent' | 'Draft';
}

export interface ReportData {
  name: string;
  income: number;
  expenses: number;
}
