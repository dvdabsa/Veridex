
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { Expense } from '../types';

interface PieChartComponentProps {
  data: Expense[];
}

const COLORS = ['#2C62F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
    const chartData = useMemo(() => {
        const categoryTotals = data.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
    }, [data]);

  return (
    <div className="w-full h-80 bg-brand-secondary p-4 rounded-xl border border-slate-700">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {chartData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
                backgroundColor: '#1A1B2E',
                border: '1px solid #374151',
                color: '#E0E1E6',
            }}
          />
          <Legend wrapperStyle={{ color: '#E0E1E6' }}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
