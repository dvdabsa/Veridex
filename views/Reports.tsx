import React from 'react';
import SimpleAreaChart from '../components/AreaChart';
import PieChartComponent from '../components/PieChart';
import type { Expense, ReportData } from '../types';

interface ReportsProps {
  expenses: Expense[];
  summary: {
    reportsData: ReportData[];
    ytdIncome: number;
    ytdExpenses: number;
    ytdNetProfit: number;
  }
}

const Reports: React.FC<ReportsProps> = ({ expenses, summary }) => {
  
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  const profitMargin = summary.ytdIncome > 0 ? (summary.ytdNetProfit / summary.ytdIncome) * 100 : 0;

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Reports</h1>
        <div className="flex gap-2">
            <button className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Export as PDF
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Export as Excel
            </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-white mb-4">Monthly Trends</h2>
          <SimpleAreaChart data={summary.reportsData} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Expense Breakdown</h2>
          <PieChartComponent data={expenses} />
        </div>
        <div className="bg-brand-secondary p-6 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">Financial Summary</h2>
            <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-800 rounded-lg">
                    <span className="text-brand-text-secondary">Total Income (YTD)</span>
                    <span className="text-green-400 font-bold text-lg">{formatCurrency(summary.ytdIncome)}</span>
                </div>
                 <div className="flex justify-between items-center p-4 bg-slate-800 rounded-lg">
                    <span className="text-brand-text-secondary">Total Expenses (YTD)</span>
                    <span className="text-red-400 font-bold text-lg">{formatCurrency(summary.ytdExpenses)}</span>
                </div>
                 <div className="flex justify-between items-center p-4 bg-slate-800 rounded-lg">
                    <span className="text-brand-text-secondary">Net Profit (YTD)</span>
                    <span className={`font-bold text-lg ${summary.ytdNetProfit >= 0 ? 'text-white' : 'text-red-400'}`}>{formatCurrency(summary.ytdNetProfit)}</span>
                </div>
                 <div className="flex justify-between items-center p-4 bg-slate-800 rounded-lg">
                    <span className="text-brand-text-secondary">Profit Margin</span>
                    <span className="text-white font-bold text-lg">{profitMargin.toFixed(1)}%</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
