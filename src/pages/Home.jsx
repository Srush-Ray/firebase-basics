import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUser } from '../redux/userSlice';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Home() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(logout());
      navigate('/');
    });
  };

  return (
    <div className="container">
      <h1>Welcome, {user ? (user.displayName || user.email) : 'Guest'}</h1>
      <button className="btn btn-primary" onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default Home;
