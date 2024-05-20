import React from 'react';

const ExpenseList = ({ expenses }) => {
  return (
    <ul className="list-group">
      {expenses.map((expense) => (
        <li
          key={expense.id}
          className="list-group-item d-flex justify-content-between align-items-center"
          style={{ width: '100%' }}
        >
          <span>{expense.description}</span>
          <span>{expense.amount}</span>
          <span className="text-muted">{expense.category}</span>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
