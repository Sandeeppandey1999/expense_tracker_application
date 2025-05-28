import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28'];

const ExpensePieChart = ({ data }) => {
  const categoryData = {};

  data?.forEach((t) => {
    if (t.type === 'EXPENSE') {
      categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
    }
  });

  const chartData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  return (
    <div>
      {/* <h4>Expense Distribution</h4> */}
      <PieChart width={400} height={300}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
          dataKey="value"
        >
          {chartData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ExpensePieChart;
