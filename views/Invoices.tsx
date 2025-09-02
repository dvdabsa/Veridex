import React, { useState } from 'react';
import type { Invoice } from '../types';
import { TrashIcon } from '../components/icons';
import AddInvoiceModal from '../components/AddInvoiceModal';

const StatusBadge: React.FC<{ status: Invoice['status'] }> = ({ status }) => {
    const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full";
    const statusClasses = {
        Paid: "bg-green-500/20 text-green-400",
        Sent: "bg-blue-500/20 text-blue-400",
        Draft: "bg-gray-500/20 text-gray-400",
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

interface InvoicesProps {
    invoices: Invoice[];
    addInvoice: (invoice: Omit<Invoice, 'id'>) => void;
    removeInvoice: (id: string) => void;
    updateStatus: (id: string, status: Invoice['status']) => void;
}

const Invoices: React.FC<InvoicesProps> = ({ invoices, addInvoice, removeInvoice, updateStatus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AddInvoiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={addInvoice} />
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Invoices</h1>
          <button onClick={() => setIsModalOpen(true)} className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Create Invoice
          </button>
        </div>

        <div className="bg-brand-secondary rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-4 font-semibold text-sm text-brand-text-secondary uppercase">Invoice ID</th>
                  <th className="p-4 font-semibold text-sm text-brand-text-secondary uppercase">Customer</th>
                  <th className="p-4 font-semibold text-sm text-brand-text-secondary uppercase">Due Date</th>
                  <th className="p-4 font-semibold text-sm text-brand-text-secondary uppercase">Status</th>
                  <th className="p-4 font-semibold text-sm text-brand-text-secondary uppercase text-right">Amount</th>
                  <th className="p-4 font-semibold text-sm text-brand-text-secondary uppercase text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {invoices.length > 0 ? invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-slate-800/50">
                    <td className="p-4 text-brand-text-secondary font-mono text-xs">#{invoice.id.slice(-6)}</td>
                    <td className="p-4 text-white font-medium">{invoice.customer}</td>
                    <td className="p-4 text-brand-text-secondary">{invoice.dueDate}</td>
                    <td className="p-4">
                      <select 
                        value={invoice.status} 
                        onChange={(e) => updateStatus(invoice.id, e.target.value as Invoice['status'])}
                        className="bg-transparent border-none text-white focus:ring-0"
                      >
                         <option value="Draft" className="bg-slate-800">Draft</option>
                         <option value="Sent" className="bg-slate-800">Sent</option>
                         <option value="Paid" className="bg-slate-800">Paid</option>
                      </select>
                    </td>
                    <td className="p-4 text-white font-semibold text-right">${invoice.amount.toFixed(2)}</td>
                    <td className="p-4 text-center">
                        <button onClick={() => removeInvoice(invoice.id)} className="text-red-400 hover:text-red-300">
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </td>
                  </tr>
                )) : (
                    <tr>
                        <td colSpan={6} className="text-center p-8 text-brand-text-secondary">No invoices created yet.</td>
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

export default Invoices;
