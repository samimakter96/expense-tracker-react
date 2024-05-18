import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [link, setLink] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);

  const { token } = useAuth();

  const getBackData = async () => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDkLA_tpv-opoyekVUD2RFipAwk_2Uu1KU`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken: token,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();
      const userData = data.users[0];

      setUserName(userData.displayName || '');
      setLink(userData.photoUrl || '');
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBackData();
  }, []);


  const sendEmailVerification = async () => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDkLA_tpv-opoyekVUD2RFipAwk_2Uu1KU`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestType: 'VERIFY_EMAIL',
            idToken: token,
            returnSecureToken: true,
          })
        }
      );

      if (!response.ok) {
        alert('Failed ot sed verification email!')
      }

      const data = await response.json();
      console.log('Verification email sent', data);
      alert('Verification email sent. Please check your inbox.')

    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };


  const profileDataHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDkLA_tpv-opoyekVUD2RFipAwk_2Uu1KU`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken: token,
            displayName: userName,
            photoUrl: link,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        alert('Failed to update profile!');
      }

      const data = await response.json();
      console.log('Profile updated successfully', data);
    } catch (error) {
       alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center border border-secondary">
        <p className="fw-bold fst-italic fs-3 p-3 ">
          Winners never quit, Quitters never win.
        </p>
        <div
          className="w-25 p-1 mx-4 border rounded-4"
          style={{ backgroundColor: '#eecbcb' }}
        >
          Your Profile is 64% completed. A complete Profile has higher chances
          of landing a job. <Link to="">Complete Now</Link>
        </div>
      </div>

      <div className="ms-5 p-5 m-5 border-bottom border-secondary-subtle rounded">
        <form onSubmit={profileDataHandler}>
          <button className="me-5 float-end btn btn-outline-danger">
            Cancel
          </button>
          <h4 className="fw-bold mb-4" style={{ marginLeft: '25rem' }}>
            Contact Details
          </h4>

          <div className="d-flex justify-content-center mb-3">
            <div className="me-3 w-25">
              <label htmlFor="name" className="form-label">
                Full Name:
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="w-25">
              <label htmlFor="picUrl" className="form-label">
                Profile Photo URL:
              </label>
              <input
                type="text"
                id="picUrl"
                className="form-control"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>

          {!emailVerified && (
            <button
              type="submit"
              style={{ marginLeft: '25rem' }}
              className="btn mt-3 btn-warning p-2"
              onClick={sendEmailVerification}
            >
              Verify Email
            </button>
          )}

          <button
            type="submit"
            style={{ marginLeft: '25rem' }}
            className="btn mt-4 btn-danger p-2"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
