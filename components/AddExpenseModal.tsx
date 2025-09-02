import React, { useState } from 'react';
import type { Expense } from '../types';
import { CloseIcon } from './icons';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: Omit<Expense, 'id'>) => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ isOpen, onClose, onSave }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Office');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    onSave({
      description,
      category,
      amount: parseFloat(amount),
      date,
      status: 'Pending',
    });
    // Reset form
    setDescription('');
    setCategory('Office');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center animate-fade-in">
      <div className="bg-brand-secondary rounded-xl border border-slate-700 p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-text-secondary hover:text-white">
          <CloseIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">Add New Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-brand-text-secondary mb-2">Description</label>
            <input type="text" name="description" id="description" value={description} onChange={e => setDescription(e.target.value)} required className="w-full bg-slate-800 text-white rounded-lg py-2 px-4 border border-slate-600 focus:ring-2 focus:ring-brand-accent focus:outline-none" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-brand-text-secondary mb-2">Category</label>
            <select name="category" id="category" value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-800 text-white rounded-lg py-2 px-4 border border-slate-600 focus:ring-2 focus:ring-brand-accent focus:outline-none">
                <option>Office</option>
                <option>Software</option>
                <option>Meals</option>
                <option>Marketing</option>
                <option>Travel</option>
            </select>
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-brand-text-secondary mb-2">Amount</label>
            <input type="number" name="amount" id="amount" value={amount} onChange={e => setAmount(e.target.value)} required min="0" step="0.01" className="w-full bg-slate-800 text-white rounded-lg py-2 px-4 border border-slate-600 focus:ring-2 focus:ring-brand-accent focus:outline-none" />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-brand-text-secondary mb-2">Date</label>
            <input type="date" name="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full bg-slate-800 text-white rounded-lg py-2 px-4 border border-slate-600 focus:ring-2 focus:ring-brand-accent focus:outline-none" />
          </div>
          <div className="pt-4 flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
            <button type="submit" className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-2 px-4 rounded-lg transition-colors">Save Expense</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;