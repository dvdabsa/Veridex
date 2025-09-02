import React, { useState } from 'react';
import type { Invoice } from '../types';
import { CloseIcon } from './icons';

interface AddInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: Omit<Invoice, 'id'>) => void;
}

const AddInvoiceModal: React.FC<AddInvoiceModalProps> = ({ isOpen, onClose, onSave }) => {
  const [customer, setCustomer] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer || !amount) return;
    
    onSave({
      customer,
      amount: parseFloat(amount),
      dueDate,
      status: 'Draft',
    });

    // Reset form
    setCustomer('');
    setAmount('');
    setDueDate(new Date().toISOString().split('T')[0]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center animate-fade-in">
      <div className="bg-brand-secondary rounded-xl border border-slate-700 p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-text-secondary hover:text-white">
          <CloseIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">Create New Invoice</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="customer" className="block text-sm font-medium text-brand-text-secondary mb-2">Customer Name</label>
            <input type="text" name="customer" id="customer" value={customer} onChange={e => setCustomer(e.target.value)} required className="w-full bg-slate-800 text-white rounded-lg py-2 px-4 border border-slate-600 focus:ring-2 focus:ring-brand-accent focus:outline-none" />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-brand-text-secondary mb-2">Amount</label>
            <input type="number" name="amount" id="amount" value={amount} onChange={e => setAmount(e.target.value)} required min="0" step="0.01" className="w-full bg-slate-800 text-white rounded-lg py-2 px-4 border border-slate-600 focus:ring-2 focus:ring-brand-accent focus:outline-none" />
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-brand-text-secondary mb-2">Due Date</label>
            <input type="date" name="dueDate" id="dueDate" value={dueDate} onChange={e => setDueDate(e.target.value)} required className="w-full bg-slate-800 text-white rounded-lg py-2 px-4 border border-slate-600 focus:ring-2 focus:ring-brand-accent focus:outline-none" />
          </div>
          <div className="pt-4 flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
            <button type="submit" className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-2 px-4 rounded-lg transition-colors">Save Invoice</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInvoiceModal;