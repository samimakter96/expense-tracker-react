import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ExpenseList from './ExpenseList';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;

    const expenseData = {
      id: uuidv4(),
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    };
    setExpenses((prevExpenses) => {
      return [...prevExpenses, expenseData];
    });
  };

  return (
    <div>
      <div className="container d-flex flex-column justify-content-center align-items-center mt-3">
        <h2 className="h1 mt-5">Expense Tracker</h2>
        <form
          onSubmit={handleSubmit}
          style={{ width: '400px' }}
          className="mt-2"
        >
          <div className="control">
            <label htmlFor="amount" className="form-label">
              Expense Amount
            </label>
            <input
              className="form-control"
              type="text"
              id="amount"
              required
              ref={amountInputRef}
            />
          </div>
          <div className="control">
            <label htmlFor="description" className="form-label">
              Expense description
            </label>
            <input
              className="form-control"
              type="text"
              id="description"
              required
              ref={descriptionInputRef}
            />
          </div>
          <div className="control">
            <label htmlFor="category" className="form-label">
              Expense category
            </label>
            <select
              className="form-select"
              aria-label="Large select example"
              id="category"
              required
              ref={categoryInputRef}
            >
              <option value="" disabled selected>
                Choose a category
              </option>
              <option value="food">Food</option>
              <option value="shopping">Shopping</option>
              <option value="grocery">Grocery</option>
              <option value="travel">Travel</option>
              <option value="clothing">Clothing</option>
              <option value="entertainment">Entertainment</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-success p-2 mt-2 rounded-2"
            >
              Add Expense
            </button>
          </div>
        </form>

        <div style={{ width: '400px' }} className="mt-4">
          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
