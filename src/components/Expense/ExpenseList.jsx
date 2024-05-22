import React, { useState } from 'react';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  // State to keep track of the expense currently being edited by its firebaseId.
  const [editId, setEditId] = useState(null);

  // State to hold the form data for the expense being edited.
  const [editForm, setEditForm] = useState({
    firebaseId: '',
    amount: '',
    description: '',
    category: '',
  });

  // This function updates the editForm state as the user types into the form inputs.
  const handleEditChange = (e) => {
    const { name, value } = e.target; // Get the name and value of the input field that triggered the change event.
    setEditForm((prevForm) => ({
      ...prevForm, // Keep the existing form data.
      [name]: value, // Update the specific field with the new value.
    }));
  };

  // This function handles the submission of the edit form.
  const handleEditSubmit = (e, expense) => {
    e.preventDefault(); // Prevent the default form submission behavior.
    onEdit(expense.firebaseId, {
      ...editForm, // Pass the updated form data to the onEdit function.
    });
    setEditId(null); // Exit edit mode by setting editId to null.
  };

  return (
    <ul className="list-group">
      {expenses.map((expense) => (
        <li
          key={expense.firebaseId} // Use firebaseId as the key for each list item.
          className="list-group-item d-flex justify-content-between align-items-center"
          style={{ width: '100%' }}
        >
          {editId === expense.firebaseId ? ( // If the current expense is being edited.
            <form
              onSubmit={(e) => handleEditSubmit(e, expense)} // Handle form submission.
              className="d-flex w-100"
            >
              <input
                type="text"
                name="description"
                value={editForm.description}
                onChange={handleEditChange} // Update the description field in the form state.
                placeholder="Description"
                className="form-control mr-2"
                required
              />
              <input
                type="number"
                name="amount"
                value={editForm.amount}
                onChange={handleEditChange} // Update the amount field in the form state.
                placeholder="Amount"
                className="form-control mr-2"
                required
              />
              <input
                type="text"
                name="category"
                value={editForm.category}
                onChange={handleEditChange} // Update the category field in the form state.
                placeholder="Category"
                className="form-control mr-2"
                required
              />
              <button type="submit" className="btn btn-primary ms-2">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setEditId(null)} // Cancel editing by setting editId to null.
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <span>{expense.description}</span>{' '}
              <span>{expense.amount}</span>{' '}
              <span className="text-muted">{expense.category}</span>
              <button
                className="btn btn-info"
                onClick={() => {
                  setEditId(expense.firebaseId); // Set the editId to the firebaseId of the expense to start editing.
                  setEditForm({
                    firebaseId: expense.firebaseId, // Set the form state with the current expense details.
                    description: expense.description,
                    amount: expense.amount,
                    category: expense.category,
                  });
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(expense.firebaseId)} // Call the onDelete function with the firebaseId of the expense to delete it.
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
