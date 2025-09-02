
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon }) => {
  const changeColor = changeType === 'increase' ? 'text-green-400' : 'text-red-400';

  return (
    <div className="bg-brand-secondary p-6 rounded-xl border border-slate-700 flex flex-col animate-fade-in">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-brand-text-secondary">{title}</p>
        <div className="text-brand-accent">{icon}</div>
      </div>
      <div className="mt-2">
        <p className="text-3xl font-bold text-white">{value}</p>
        {change && (
          <p className={`text-sm mt-1 ${changeColor}`}>
            {change} vs last month
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
