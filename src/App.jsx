import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { login, logout, selectUser } from './redux/userSlice';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
