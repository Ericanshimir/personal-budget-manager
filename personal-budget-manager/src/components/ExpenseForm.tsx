import React, { useState, useEffect } from 'react';
import { Expense } from '../types';

interface Props {
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budgetLimits: { [key: string]: number };
  setBudgetLimits: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  editingExpense: { expense: Expense; index: number } | null;
  setEditingExpense: React.Dispatch<React.SetStateAction<{ expense: Expense; index: number } | null>>;
}

const ExpenseForm: React.FC<Props> = ({ setExpenses, budgetLimits, setBudgetLimits, editingExpense, setEditingExpense }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.expense.amount.toString());
      setDate(editingExpense.expense.date);
      setCategory(editingExpense.expense.category);
    }
  }, [editingExpense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expense: Expense = {
      amount: parseFloat(amount),
      date,
      category,
    };

    if (editingExpense) {
      setExpenses((prevExpenses) =>
        prevExpenses.map((exp, idx) => (idx === editingExpense.index ? expense : exp))
      );
      setEditingExpense(null);
    } else {
      setExpenses((prevExpenses) => [...prevExpenses, expense]);
    }

    setAmount('');
    setDate('');
    setCategory('');
  };

  return (
    <div>
      <h2>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />

        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="others">Others</option>
        </select>

        <button type="submit">{editingExpense ? 'Update Expense' : 'Add Expense'}</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
