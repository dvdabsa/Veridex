
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { ReportData } from '../types';

interface SimpleAreaChartProps {
  data: ReportData[];
}

const SimpleAreaChart: React.FC<SimpleAreaChartProps> = ({ data }) => {
  return (
    <div className="w-full h-80 bg-brand-secondary p-6 rounded-xl border border-slate-700">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2C62F6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#2C62F6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#A0A3B1" />
          <YAxis stroke="#A0A3B1" />
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <Tooltip
            contentStyle={{
                backgroundColor: '#1A1B2E',
                border: '1px solid #374151',
                color: '#E0E1E6',
            }}
          />
          <Legend wrapperStyle={{ color: '#E0E1E6' }}/>
          <Area type="monotone" dataKey="income" stroke="#2C62F6" fillOpacity={1} fill="url(#colorIncome)" />
          <Area type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpenses)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleAreaChart;
