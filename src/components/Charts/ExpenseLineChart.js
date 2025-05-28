import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ExpenseLineChart = ({ data }) => {
  const groupedData = {};

  data?.forEach((t) => {
    const date = t.date;
    if (!groupedData[date]) {
      groupedData[date] = { income: 0, expense: 0 };
    }
    if (t.type === 'INCOME') groupedData[date].income += t.amount;
    else groupedData[date].expense += t.amount;
  });

  const chartData = Object.entries(groupedData).map(([date, val]) => ({
    date,
    income: val.income,
    expense: val.expense,
  }));

  return (
    <div>
      {/* <h4>Daily Income vs Expense</h4> */}
      <LineChart width={400} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#00C49F" />
        <Line type="monotone" dataKey="expense" stroke="#FF8042" />
      </LineChart>
    </div>
  );
};

export default ExpenseLineChart;
