import React from 'react';
import { Expense } from '../types';

interface Props {
  expenses: Expense[];
  budgetLimits: { [key: string]: number };
  setBudgetLimits: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  totalBudget: number;
}

const BudgetAlerts: React.FC<Props> = ({ expenses, budgetLimits, setBudgetLimits, totalBudget }) => {
  const categoryTotals = expenses.reduce(
    (totals: { [key: string]: number }, expense) => {
      totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
      return totals;
    },
    { food: 0, entertainment: 0, others: 0 }
  );

  const handleBudgetLimitChange = (category: string, value: string) => {
    setBudgetLimits((prevLimits) => ({
      ...prevLimits,
      [category]: parseFloat(value) || 0,
    }));
  };

  const totalSpent = Object.values(categoryTotals).reduce((sum, value) => sum + value, 0);

  return (
    <div className="budget-alert">
      <h2>Budget Alerts</h2>

      {Object.keys(budgetLimits).map((category) => (
        <div key={category} className="budget-item">
          <label>{category.charAt(0).toUpperCase() + category.slice(1)} Budget:</label>
          <input
            type="number"
            value={budgetLimits[category]}
            onChange={(e) => handleBudgetLimitChange(category, e.target.value)}
            placeholder={`Set ${category} budget`}
          />
          <p>
            Spent: ${categoryTotals[category]?.toFixed(2)} / ${budgetLimits[category]?.toFixed(2)}
          </p>
          {categoryTotals[category] > budgetLimits[category] && (
            <p className="alert-danger">Warning: Over Budget in {category}!</p>
          )}
        </div>
      ))}

      <div className="total-budget-alert">
        <h3>Total Budget</h3>
        <p>Total Spent: ${totalSpent.toFixed(2)} / ${totalBudget.toFixed(2)}</p>
        {totalSpent > totalBudget && (
          <p className="alert-danger">Warning: Over Total Budget!</p>
        )}
      </div>
    </div>
  );
};

export default BudgetAlerts;
