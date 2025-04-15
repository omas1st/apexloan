// frontend/src/pages/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';

const API_BASE_URL = 'https://apexloanserver.vercel.app';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Updated API endpoint
      const response = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { 
        email, 
        newPassword 
      });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="forgotpassword-container">
      <h2>Forgot Password</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          name="email" 
          placeholder="Enter your registered email" 
          onChange={e => setEmail(e.target.value)}
          required 
        />
        <input 
          name="newPassword" 
          placeholder="New Password" 
          type="password" 
          onChange={e => setNewPassword(e.target.value)}
          required 
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;