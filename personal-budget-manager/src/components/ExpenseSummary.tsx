import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Expense } from '../types';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface Props {
  expenses: Expense[];
}

const ExpenseSummary: React.FC<Props> = ({ expenses }) => {
  const categoryTotals: { [key in 'food' | 'entertainment' | 'others']: number } = expenses.reduce(
    (totals, expense) => {
      totals[expense.category as 'food' | 'entertainment' | 'others'] =
        (totals[expense.category as 'food' | 'entertainment' | 'others'] || 0) + expense.amount;
      return totals;
    },
    { food: 0, entertainment: 0, others: 0 }
  );

  const data = {
    labels: ['Food', 'Entertainment', 'Others'],
    datasets: [
      {
        data: [categoryTotals.food, categoryTotals.entertainment, categoryTotals.others],
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
      },
    ],
  };

  return (
    <div>
      <h2>Expense Summary</h2>
      <Pie data={data} width={200} height={200} />
    </div>
  );
};

export default ExpenseSummary;
