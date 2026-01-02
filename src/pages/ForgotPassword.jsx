import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setInfo('A password reset email has been sent to your email address. Please check your inbox to reset your password.');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="auth-container">
      <h1>Forgot Password</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {info && <p style={{ color: 'green' }}>{info}</p>}
      <form className="auth-form" onSubmit={handleForgotPassword}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
