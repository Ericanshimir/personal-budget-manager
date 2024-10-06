import React from 'react';
import { Expense } from '../types';

interface Props {
  expenses: Expense[];
  handleEditExpense: (expense: Expense, index: number) => void;
  handleDeleteExpense: (index: number) => void;
}

const ExpenseList: React.FC<Props> = ({ expenses, handleEditExpense, handleDeleteExpense }) => {
  return (
    <div>
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            <span>{expense.date} - ${expense.amount} - {expense.category}</span>
            <button
              style={{ backgroundColor: 'blue', color: 'white', margin: '0 5px' }}
              onClick={() => handleEditExpense(expense, index)}
            >
              Edit
            </button>
            <button
              style={{ backgroundColor: 'red', color: 'white' }}
              onClick={() => handleDeleteExpense(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
