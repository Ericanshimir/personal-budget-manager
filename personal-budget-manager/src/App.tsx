import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import BudgetAlerts from './components/BudgetAlerts';
import './App.css';
import { Expense } from './types';

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [totalBudget, setTotalBudget] = useState<number>(() => {
    const savedBudget = localStorage.getItem('totalBudget');
    return savedBudget ? parseFloat(savedBudget) : 0;
  });

  const [budgetLimits, setBudgetLimits] = useState<{ [key: string]: number }>({
    food: 0,
    entertainment: 0,
    others: 0,
  });

  const [editingExpense, setEditingExpense] = useState<{ expense: Expense; index: number } | null>(null);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('totalBudget', totalBudget.toString());
  }, [totalBudget]);

  const handleSetTotalBudget = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputBudget = parseFloat((e.currentTarget.elements[0] as HTMLInputElement).value);
    setTotalBudget(inputBudget);
  };

  const handleEditExpense = (expense: Expense, index: number) => {
    setEditingExpense({ expense, index });
  };

  const handleDeleteExpense = (index: number) => {
    setExpenses((prevExpenses) => prevExpenses.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>Personal Budget Manager</h1>
        </header>

        <section id="budget-form" className="app-section">
          <h2>Set Total Budget</h2>
          <form onSubmit={handleSetTotalBudget}>
            <input type="number" placeholder="Enter your total budget" required />
            <button type="submit">Set Budget</button>
          </form>
          <p>Total Budget: ${totalBudget}</p>
        </section>

        <section id="expense-form" className="app-section">
          <ExpenseForm
            setExpenses={setExpenses}
            budgetLimits={budgetLimits}
            setBudgetLimits={setBudgetLimits}
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
          />
        </section>

        <section id="expense-list" className="app-section">
          <ExpenseList
            expenses={expenses}
            handleDeleteExpense={handleDeleteExpense}
            handleEditExpense={handleEditExpense}
          />
        </section>

        <section id="expense-summary" className="app-section">
          <ExpenseSummary expenses={expenses} />
        </section>

        <section id="budget-alerts" className="app-section">
          <BudgetAlerts
            expenses={expenses}
            budgetLimits={budgetLimits}
            setBudgetLimits={setBudgetLimits}
            totalBudget={totalBudget}
          />
        </section>
      </div>
    </div>
  );
};

export default App;
