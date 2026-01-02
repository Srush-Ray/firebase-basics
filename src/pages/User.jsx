import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import { realtimeDB } from '../firebase';
import { ref, get, set } from 'firebase/database';

function User() {
  const user = useSelector(selectUser);
  const [name, setName] = useState('');
  const [savedName, setSavedName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      const userRef = ref(realtimeDB, 'users/' + user.uid);
      // get(userRef)
      //   .then((snapshot) => {
      //     if (snapshot.exists()) {
      //       const data = snapshot.val();
      //       setSavedName(data.name);
      //     }
      //     setLoading(false);
      //   })
      //   .catch((error) => {
      //     setError(error.message);
      //     setLoading(false);
      //   });
    }
  }, [user]);

  const handleSave = () => {
    if (user) {
      setError(null);
      setMessage('');
      // const userRef = ref(realtimeDB, 'users/' + user.uid);
      // set(userRef, { name })
      //   .then(() => {
      //     setMessage('Name saved.');
      //     setSavedName(name);
      //     setName(''); // Reset input box
      //   })
      //   .catch((error) => {
      //     setError(error.message);
      //   });
    }
  };

  return (
    <div className="container mt-5">
      <h1>User Profile</h1>
      {savedName && <h2>{savedName}</h2>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {error && <p className="text-danger">{error}</p>}
          {message && <p className="text-success">{message}</p>}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
}

export default User;
