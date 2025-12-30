import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { 
  GoogleAuthProvider, 
  signInWithRedirect, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { login } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    setError(null);
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider)
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleEmailSignUp = (e) => {
    e.preventDefault();
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(login({
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName,
        }));
        navigate('/home');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleEmailSignIn = (e) => {
    e.preventDefault();
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(login({
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName,
        }));
        navigate('/home');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="auth-container">
      <h1>Ticked-Off</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className="auth-form">
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button className="btn btn-primary me-2" onClick={handleEmailSignIn}>Log In</button>
        <button className="btn btn-secondary" onClick={handleEmailSignUp}>Sign Up</button>
      </form>
      <hr />
      <button className="btn btn-danger" onClick={handleGoogleSignIn}>Log in with Google</button>
    </div>
  );
}

export default Login;
