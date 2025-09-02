import React from 'react';
import StatCard from '../components/StatCard';
import SimpleAreaChart from '../components/AreaChart';
import type { Expense, ReportData } from '../types';

const DollarSignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v1m0 6v1m6-4h.01M6 12h.01M12 2a10 10 0 110 20 10 10 0 010-20z" /></svg>;
const ArrowTrendingUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

interface OverviewProps {
    expenses: Expense[];
    summary: {
        reportsData: ReportData[];
        ytdNetProfit: number;
        monthlyCashFlow: number;
    }
}

const Overview: React.FC<OverviewProps> = ({ expenses, summary }) => {
    const upcomingExpensesTotal = expenses
        .filter(e => e.status === 'Pending')
        .reduce((acc, curr) => acc + curr.amount, 0);
    
    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-white mb-6">Overview</h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Net Profit (YTD)"
                    value={formatCurrency(summary.ytdNetProfit)}
                    changeType={summary.ytdNetProfit >= 0 ? 'increase' : 'decrease'}
                    icon={<DollarSignIcon />}
                />
                <StatCard
                    title="Monthly Cash Flow"
                    value={formatCurrency(summary.monthlyCashFlow)}
                    changeType={summary.monthlyCashFlow >= 0 ? 'increase' : 'decrease'}
                    icon={<ArrowTrendingUpIcon />}
                />
                <StatCard
                    title="Upcoming Expenses"
                    value={`${formatCurrency(upcomingExpensesTotal)}`}
                    icon={<ClockIcon />}
                />
            </div>
            
            {/* Main Chart */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Income vs. Expenses</h2>
                <SimpleAreaChart data={summary.reportsData} />
            </div>

            {/* Upcoming Expenses List */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-4">Pending Transactions</h2>
                <div className="bg-brand-secondary rounded-xl border border-slate-700">
                    <ul className="divide-y divide-slate-700">
                        {expenses.filter(e => e.status === 'Pending').map(expense => (
                            <li key={expense.id} className="p-4 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-white">{expense.description}</p>
                                    <p className="text-sm text-brand-text-secondary">{expense.date}</p>
                                </div>
                                <p className="font-semibold text-red-400">-{formatCurrency(expense.amount)}</p>
                            </li>
                        ))}
                         {expenses.filter(e => e.status === 'Pending').length === 0 && (
                            <li className="p-4 text-center text-brand-text-secondary">No pending transactions.</li>
                         )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Overview;
