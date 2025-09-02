import React, { useState } from 'react';
import type { Expense } from '../types';
import { TrashIcon } from '../components/icons';
import AddExpenseModal from '../components/AddExpenseModal';

const StatusBadge: React.FC<{ status: Expense['status'] }> = ({ status }) => {
    const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full";
    const statusClasses = {
        Paid: "bg-green-500/20 text-green-400",
        Pending: "bg-yellow-500/20 text-yellow-400",
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

interface ExpensesProps {
    expenses: Expense[];
    addExpense: (expense: Omit<Expense, 'id'>) => void;
    removeExpense: (id: string) => void;
}

const Expenses: React.FC<ExpensesProps> = ({ expenses, addExpense, removeExpense }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AddExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={addExpense} />
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Expenses</h1>
          <button onClick={() => setIsModalOpen(true)} className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Add Expense
          </button>
        </div>

        <div className="bg-brand-secondary rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-4 font-semibold text-sm text-brand-text-secondary uppercase">Description</th>
                  <th className="p-4 font-semibold text-sm text-brand-text-secondary uppercase">Category</th>
                  <th className="p-4 font-semibold text-sm text-brand-text-secondary uppercase">Date</th>
                  <th className="p-4 font-semibold text-sm text-brand-text-secondary uppercase">Status</th>
                  <th className="p-4 font-semibold text-sm text-brand-text-secondary uppercase text-right">Amount</th>
                  <th className="p-4 font-semibold text-sm text-brand-text-secondary uppercase text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {expenses.length > 0 ? expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-slate-800/50">
                    <td className="p-4 text-white font-medium">{expense.description}</td>
                    <td className="p-4 text-brand-text-secondary">{expense.category}</td>
                    <td className="p-4 text-brand-text-secondary">{expense.date}</td>
                    <td className="p-4"><StatusBadge status={expense.status} /></td>
                    <td className="p-4 text-white font-semibold text-right">-${expense.amount.toFixed(2)}</td>
                    <td className="p-4 text-center">
                        <button onClick={() => removeExpense(expense.id)} className="text-red-400 hover:text-red-300">
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="text-center p-8 text-brand-text-secondary">No expenses recorded yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Expenses;