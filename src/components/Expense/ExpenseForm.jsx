import React, { useEffect, useRef } from 'react';
import ExpenseList from './ExpenseList';
import axios from 'axios'; // Importing Axios for HTTP requests
import { useDispatch, useSelector } from 'react-redux';
import {
  addExpense,
  deleteExpense,
  editExpense,
  setExpenses,
  activatePremium,
} from '../../store/expenseSlice';
import { toggleDarkMode } from '../../store/themeSlice';

const Expenses = () => {
  // const [expenses, setExpenses] = useState([]); // State to hold expenses data

  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const isPremium = useSelector((state) => state.expenses.isPremium);
  // const darkMode = useSelector((state) => state.theme.darkMode);

  // Refs for input fields
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

  // Get entered email from localStorage and format it
  const enteredEmail = localStorage
    .getItem('email')
    .replace('@', '')
    .replace('.', '');

  // Fetch data from Firebase when component mounts or when enteredEmail changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://expense-tracker-react-14b3c-default-rtdb.firebaseio.com/${enteredEmail}.json`
        );

        const result = response.data;

        if (result) {
          // Map fetched data to array of expenses and setExpenses state
          const storedData = Object.entries(result).map(
            ([firebaseId, value]) => ({
              ...value,
              firebaseId, // Use Firebase ID as the unique identifier
            })
          );
          dispatch(setExpenses(storedData));
        } else {
          dispatch(setExpenses([])); // If no data found, set expenses to empty array
        }
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };

    fetchData();
  }, [dispatch, enteredEmail]); // Trigger useEffect when enteredEmail changes

  // Function to add new expense to Firebase and update state
  const addData = async (expense) => {
    try {
      // Send POST request to Firebase
      const response = await axios.post(
        `https://expense-tracker-react-14b3c-default-rtdb.firebaseio.com/${enteredEmail}.json`,
        expense
      );
      expense.firebaseId = response.data.name; // Assign Firebase ID to expense
      dispatch(addExpense(expense)); // Add expense to state
    } catch (error) {
      console.log('Error creating data', error);
    }
  };

  // Function to delete expense from Firebase and update state
  const handleDelete = async (firebaseId) => {
    try {
      // Send DELETE request to Firebase
      await axios.delete(
        `https://expense-tracker-react-14b3c-default-rtdb.firebaseio.com/${enteredEmail}/${firebaseId}.json`
      );
      dispatch(deleteExpense(firebaseId));
    } catch (error) {
      console.log('Error deleting data', error);
    }
  };

  // Function to edit expense in Firebase and update state
  const handleEdit = async (firebaseId, updatedExpense) => {
    try {
      // Send PUT request to Firebase
      await axios.put(
        `https://expense-tracker-react-14b3c-default-rtdb.firebaseio.com/${enteredEmail}/${firebaseId}.json`,
        updatedExpense
      );
      dispatch(editExpense({ firebaseId, updatedExpense }));
    } catch (error) {
      console.log('Error editing data', error);
    }
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Get values from input fields
    const enteredAmount = amountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;

    // Create expense object
    const expenseData = {
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    };

    addData(expenseData); // Add expense to Firebase and update state

    // Clear input fields after submission
    amountInputRef.current.value = '';
    descriptionInputRef.current.value = '';
    categoryInputRef.current.value = '';
  };

  const handleActivatePremium = () => {
    dispatch(activatePremium());
    dispatch(toggleDarkMode());
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const downloadCSV = () => {
    const csvContent = [
      ['Description', 'Amount', 'Category'],
      ...expenses.map((expense) => [
        expense.description,
        expense.amount,
        expense.category,
      ]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'expenses.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="container d-flex flex-column justify-content-center align-items-center mt-3">
        <h2 className="h1 mt-5">Expense Tracker</h2>
        <form
          onSubmit={handleSubmit}
          style={{ width: '500px' }}
          className="mt-2"
        >
          {/* Input fields for expense data */}
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

          {/* Submit button */}
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-success p-2 mt-2 rounded-2"
            >
              Add Expense
            </button>
          </div>
        </form>

        {totalAmount > 10000 &&  (
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-warning" onClick={handleActivatePremium}>
              Activate Premium
            </button>
          </div>
        )}

        {isPremium && (
          <>
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-secondary"
                onClick={handleToggleDarkMode}
              >
                Toggle Dark Mode
              </button>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button className="btn btn-info" onClick={downloadCSV}>
                Download CSV
              </button>
            </div>
          </>
        )}

        {/* Display list of expenses */}
        <div style={{ width: '500px' }} className="mt-4">
          <ExpenseList
            expenses={expenses}
            onDelete={handleDelete} // Pass deleteExpense function as prop
            onEdit={handleEdit} // Pass editExpense function as prop
          />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
