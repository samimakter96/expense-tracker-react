import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center border border-secondary">
        <p className="fw-bold fst-italic fs-3 p-3 ">
          Welcome to Expense Tracker!!!
        </p>
        <div
          className="p-2 mx-4 border rounded-4"
          style={{ backgroundColor: '#eecbcb' }}
        >
          Your Profile is Incomplete <Link to="/profile">Complete Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
