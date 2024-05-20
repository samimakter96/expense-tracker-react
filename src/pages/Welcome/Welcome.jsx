import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Expenses from '../../components/Expense/ExpenseForm';

const Welcome = () => {

  const authContext = useAuth()
  const navigate = useNavigate()

  const logOutHandler = () => {
    authContext.logout();
    navigate('/login')
  }

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center border-bottom border-secondary p-3">
          <div className="d-flex align-items-center">
            <p className="fw-bold fst-italic fs-3 mb-0">
              Welcome to Expense Tracker!!!
            </p>
          </div>
          <div className="d-flex align-items-center">
            <div
              className="p-2 mx-4 border rounded-4"
              style={{ backgroundColor: '#eecbcb' }}
            >
              Your Profile is Incomplete <Link to="/profile">Complete Now</Link>
            </div>
            <button className="btn btn-outline-primary" onClick={logOutHandler}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div>
        <Expenses />
      </div>
    </>
  );
};

export default Welcome;
