import React, { useState, useMemo } from 'react';
import SideNav from '../components/SideNav';
import Overview from '../views/Overview';
import Expenses from '../views/Expenses';
import Invoices from '../views/Invoices';
import Reports from '../views/Reports';
import AdvisorChat from '../views/AdvisorChat';
import Settings from '../views/Settings';
import { useAuth } from '../context/AuthContext';
import { MOCK_EXPENSES, MOCK_INVOICES } from '../constants';
import type { Expense, Invoice, ReportData } from '../types';

const DashboardPage: React.FC = () => {
  const [activeView, setActiveView] = useState('Overview');
  const { user } = useAuth();
  
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);

  if (!user) {
    return <div>Redirecting to login...</div>;
  }
  
  const financialSummary = useMemo(() => {
    const monthlyData: { [key: string]: { income: number; expenses: number } } = {};

    invoices.forEach(invoice => {
        if (invoice.status === 'Paid') {
            const month = new Date(invoice.dueDate).toLocaleString('default', { month: 'short' });
            if (!monthlyData[month]) monthlyData[month] = { income: 0, expenses: 0 };
            monthlyData[month].income += invoice.amount;
        }
    });

    expenses.forEach(expense => {
        const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
        if (!monthlyData[month]) monthlyData[month] = { income: 0, expenses: 0 };
        monthlyData[month].expenses += expense.amount;
    });
    
    const reportsData: ReportData[] = Object.keys(monthlyData).map(month => ({
        name: month,
        income: monthlyData[month].income,
        expenses: monthlyData[month].expenses,
    })).sort((a, b) => new Date(`1 ${a.name} 2024`) > new Date(`1 ${b.name} 2024`) ? 1 : -1);


    const ytdIncome = invoices.filter(i => i.status === 'Paid').reduce((acc, i) => acc + i.amount, 0);
    const ytdExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
    const ytdNetProfit = ytdIncome - ytdExpenses;

    const currentMonthName = new Date().toLocaleString('default', { month: 'short' });
    const monthlyCashFlow = (monthlyData[currentMonthName]?.income || 0) - (monthlyData[currentMonthName]?.expenses || 0);

    return { reportsData, ytdIncome, ytdExpenses, ytdNetProfit, monthlyCashFlow };

  }, [expenses, invoices]);

  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      id: `exp${Date.now()}`,
      ...expenseData,
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const removeExpense = (id: string) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };
  
  const addInvoice = (invoiceData: Omit<Invoice, 'id'>) => {
    const newInvoice: Invoice = {
      id: `inv${Date.now()}`,
      ...invoiceData,
    };
    setInvoices(prev => [newInvoice, ...prev]);
  };

  const removeInvoice = (id: string) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
  };

  const updateInvoiceStatus = (id: string, status: Invoice['status']) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status } : inv));
  };

  const renderView = () => {
    switch (activeView) {
      case 'Overview':
        return <Overview expenses={expenses} summary={financialSummary} />;
      case 'Expenses':
        return <Expenses expenses={expenses} addExpense={addExpense} removeExpense={removeExpense} />;
      case 'Invoices':
        return <Invoices invoices={invoices} addInvoice={addInvoice} removeInvoice={removeInvoice} updateStatus={updateInvoiceStatus} />;
      case 'Reports':
        return <Reports expenses={expenses} summary={financialSummary} />;
      case 'Advisor Chat':
        return <AdvisorChat />;
      case 'Settings':
        return <Settings />;
      default:
        return <Overview expenses={expenses} summary={financialSummary} />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <SideNav activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 ml-64 p-8 bg-brand-primary">
        <div className="max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
