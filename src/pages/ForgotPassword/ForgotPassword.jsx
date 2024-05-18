import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    setIsLoading(true);
    
    const response = fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDkLA_tpv-opoyekVUD2RFipAwk_2Uu1KU`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestType: 'PASSWORD_RESET',
          email: enteredEmail,
          returnSecureToken: true,
        }),
      }
    ).then(res => {
      setIsLoading(false)
      if (res.ok) {
        alert('Email sent. Please check your inbox.')
        navigate('/login')
      } else {
        throw new Error;
      }
    }).catch((error) => {
      alert('Something Went Wrong Try Again')
      console.log(error);
      navigate('/login')
    })
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: '70vh' }}
    >
      <section>
        <h1>Forgot Password</h1>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <input
              className="mt-3 form-control w-100"
              type="email"
              placeholder="Enter your email"
              ref={emailInputRef}
            />
          </div>
          <div>
            <button type='submit' class="btn btn-success p-2 mt-3">
              Change Password
            </button>
            {isLoading && <p>Sending Request....!</p>}
          </div>
        </form>
      </section>
    </div>
  );
};

export default ForgotPassword;
