import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ExpenseList from './ExpenseList';
import axios from 'axios';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

  const enteredEmail = localStorage
    .getItem('email')
    .replace('@', '')
    .replace('.', '');

  // Whenever the user refreshes the page do a GET request and get all the previously added expenses that were there
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://expense-tracker-react-14b3c-default-rtdb.firebaseio.com/${enteredEmail}.json`
        );

        const result = response.data;

        if (result) {
          const storedData = Object.values(result);
          setExpenses(storedData);
          // console.log(storedData);
        } else {
          setExpenses([]);
        }
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };

    fetchData();
  }, [enteredEmail]);

  // Store the data to the database
  const addData = async (expense) => {
    try {
      await axios.post(
        `https://expense-tracker-react-14b3c-default-rtdb.firebaseio.com/${enteredEmail}.json`,
        expense
      );
    } catch (error) {
      console.log('Error creating data', error);
    }
  };

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

    setExpenses((prevExpenses) => [...prevExpenses, expenseData]);

    addData(expenseData);
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
              type="number"
              id="amount"
              required
              ref={amountInputRef}
            />
          </div>
          <div className="control">
            <label htmlFor="description" className="form-label">
              Expense Description
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
              Expense Category
            </label>
            <select
              className="form-select"
              aria-label="Large select example"
              id="category"
              required
              ref={categoryInputRef}
              defaultValue=""
            >
              <option value="" disabled>
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
