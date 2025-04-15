// apexloan/src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

const API_BASE_URL = 'https://apexloanserver.vercel.app';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Updated login endpoint
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { 
        username, 
        password 
      });
      // Save authentication data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "Login error");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          name="username" 
          placeholder="Username" 
          onChange={e => setUsername(e.target.value)}
          required 
        />
        <input 
          name="password" 
          placeholder="Password" 
          type="password" 
          onChange={e => setPassword(e.target.value)}
          required 
        />
        <button type="submit">Login</button>
      </form>
      <p>
        New user? <Link to="/register">Register here</Link>
      </p>
      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default Login;