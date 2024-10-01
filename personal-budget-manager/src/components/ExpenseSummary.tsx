import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { Expense } from '../types';

// Register ArcElement
Chart.register(ArcElement);

type Category = 'food' | 'entertainment' | 'others';

interface Props {
  expenses: Expense[];
}

const ExpenseSummary: React.FC<Props> = ({ expenses }) => {
  const categoryTotals: { [key in Category]: number } = expenses.reduce(
    (totals, expense) => {
      const category = expense.category as Category;
      totals[category] = (totals[category] || 0) + expense.amount;
      return totals;
    },
    { food: 0, entertainment: 0, others: 0 }
  );

  const data = {
    labels: ['Food', 'Entertainment', 'Others'],
    datasets: [
      {
        data: [categoryTotals.food, categoryTotals.entertainment, categoryTotals.others],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return <Pie data={data} />;
};

export default ExpenseSummary;
