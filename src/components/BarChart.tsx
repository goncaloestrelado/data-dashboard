import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card } from "./Card";

const data = [
  {
    name: "Jan",
    revenue: 4000,
    profit: 2400,
    expenses: 1600,
  },
  {
    name: "Feb",
    revenue: 3000,
    profit: 1398,
    expenses: 1602,
  },
  {
    name: "Mar",
    revenue: 2000,
    profit: 9800,
    expenses: -7800,
  },
  {
    name: "Apr",
    revenue: 2780,
    profit: 3908,
    expenses: -1128,
  },
  {
    name: "May",
    revenue: 1890,
    profit: 4800,
    expenses: -2910,
  },
  {
    name: "Jun",
    revenue: 2390,
    profit: 3800,
    expenses: -1410,
  },
  {
    name: "Jul",
    revenue: 3490,
    profit: 4300,
    expenses: -810,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function SimpleBarChart() {
  return (
    <Card title="Financial Performance" subtitle="Monthly revenue, profit, and expenses comparison">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" className="dark:stroke-gray-700" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "14px" }} iconType="rect" />
            <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" radius={[2, 2, 0, 0]} animationDuration={1000} />
            <Bar dataKey="profit" fill="#10b981" name="Profit" radius={[2, 2, 0, 0]} animationDuration={1200} />
            <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[2, 2, 0, 0]} animationDuration={1400} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Total Revenue</p>
          <p className="text-lg font-bold text-blue-900 dark:text-blue-100">
            ${data.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
          </p>
        </div>
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">Total Profit</p>
          <p className="text-lg font-bold text-green-900 dark:text-green-100">
            ${data.reduce((sum, item) => sum + item.profit, 0).toLocaleString()}
          </p>
        </div>
        <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">Net Expenses</p>
          <p className="text-lg font-bold text-red-900 dark:text-red-100">
            ${Math.abs(data.reduce((sum, item) => sum + item.expenses, 0)).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
        <p className="text-xs text-yellow-800 dark:text-yellow-200 text-center">
          <span className="font-medium">Disclaimer:</span> This data is fictional and for demonstration purposes only.
        </p>
      </div>
    </Card>
  );
}
