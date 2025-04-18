// apexloan/src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const API_BASE_URL = 'https://apexloanserver.vercel.app';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    identityNumber: '',
    dateOfBirth: '',
    occupation: '',
    whatsapp: '',
    country: '',
    homeAddress: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      // Updated registration endpoint
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, formData);
      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setSuccess(response.data.message);
        setError('');
        navigate('/dashboard');
      } else {
        setError("Registration failed: no user data returned");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration error");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="identityNumber" placeholder="Identity Number" onChange={handleChange} />
        <input name="dateOfBirth" type="date" onChange={handleChange} />
        <input name="occupation" placeholder="Occupation" onChange={handleChange} />
        <input name="whatsapp" placeholder="WhatsApp Number" onChange={handleChange} />
        <select name="country" onChange={handleChange} required>
          <option value="">Select Country</option>
          <option value="South Africa">South Africa</option>
          <option value="United Kingdom">United Kingdom</option>
  <option value="United States">United States</option>
  <option value="Uruguay">Uruguay</option>
          <option value="Sweden">Sweden</option>
  <option value="Switzerland">Switzerland</option>
        <option value="Netherlands">Netherlands</option>
            <option value="New Zealand">New Zealand</option>
        <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
        <option value="France">France</option>
        <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
        <option value="Canada">Canada</option>
        <option value="Belgium">Belgium</option>
        <option value="Denmark">Denmark</option>
        <option value="Egypt">Egypt</option>
        <option value="France">France</option>
        <option value="Other">Other</option>
        </select>
        <input name="homeAddress" placeholder="Home Address" onChange={handleChange} />
        <div className="account-container">
          <input name="username" placeholder="Username" onChange={handleChange} required />
          <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
          <input name="confirmPassword" placeholder="Confirm Password" type="password" onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
