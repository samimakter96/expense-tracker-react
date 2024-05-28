import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
  totalAmount: 0,
  isPremium: false,
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
      state.totalAmount = action.payload.reduce(
        (total, expense) => total + Number(expense.amount),
        0
      );
      state.isPremium = state.totalAmount > 10000;
    },

    addExpense(state, action) {
      state.expenses.push(action.payload);
      state.totalAmount += Number(action.payload.amount);
      state.isPremium = state.totalAmount > 10000;
    },

    deleteExpense(state, action) {
      const expenseId = action.payload;
      const expenseToDelete = state.expenses.find(
        (expense) => expense.firebaseId === expenseId
      );
      state.expenses = state.expenses.filter(
        (expense) => expense.firebaseId !== expenseId
      );
      state.totalAmount -= Number(expenseToDelete.amount);
      state.isPremium = state.totalAmount > 10000;
    },

    editExpense(state, action) {
      const { firebaseId, updatedExpense } = action.payload;
      const expenseIndex = state.expenses.findIndex(
        (expense) => expense.firebaseId === firebaseId
      );
      state.totalAmount -= Number(state.expenses[expenseIndex].amount);
      state.expenses[expenseIndex] = updatedExpense;
      state.totalAmount += Number(updatedExpense.amount);
      state.isPremium = state.totalAmount > 10000;
    },
    activatePremium(state) {
      state.isPremium = true;
    }
  },
});


export const {setExpenses, addExpense, deleteExpense, editExpense, activatePremium} = expensesSlice.actions;

export default expensesSlice.reducer;