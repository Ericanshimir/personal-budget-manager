import React from 'react';
import { Expense } from '../types';

interface Props {
  expenses: Expense[];
  dispatch: React.Dispatch<any>;
  setEditingExpense: React.Dispatch<React.SetStateAction<Expense | null>>;
}

const ExpenseList: React.FC<Props> = ({ expenses, dispatch, setEditingExpense }) => {
  return (
    <ul className="list-group">
      {expenses.map((expense, index) => (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
          <span>{expense.date} - {expense.category} - ${expense.amount.toFixed(2)}</span>
          <div>
            <button className="btn btn-primary btn-sm" onClick={() => setEditingExpense(expense)}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={() => dispatch({ type: 'DELETE_EXPENSE', payload: index })}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
