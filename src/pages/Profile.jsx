import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const nameInputRef = useRef();
  const linkInputRef = useRef();

  const {token} = useAuth()

  const profileDataHandler = async (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredLink = linkInputRef.current.value;

    
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
            displayName: enteredName,
            photoUrl: enteredLink,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update profile!');
      }

      const data = await response.json();
      console.log('Profile updated successfully', data);

      // Clear input fields after successful submission
      nameInputRef.current.value = '';
      linkInputRef.current.value = '';
    } catch (error) {
      console.log(error.message);
    }
  };



  return (
    <div>
      <div className="d-flex justify-content-between align-items-center border border-secondary">
        <p className="fw-bold fst-italic fs-3 p-3 ">
          Winners never quite, Quitters never win.
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
                ref={nameInputRef}
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
                ref={linkInputRef}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{ marginLeft: '25rem' }}
            className="btn mt-3 btn-danger p-2 "
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
