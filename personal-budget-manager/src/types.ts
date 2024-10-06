export interface Expense {
  amount: number;
  date: string;
  category: string;
}

export interface EditingExpense extends Expense {
  index: number;
}

export interface BudgetLimits {
  food: number;
  entertainment: number;
  others: number;
}
