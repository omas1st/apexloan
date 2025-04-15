// apexloan/src/pages/Loan.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Loan.css';

const API_BASE_URL = 'https://apexloanserver.vercel.app';

const Loan = () => {
  const [loanData, setLoanData] = useState({
    loanType: '',
    amount: ''
  });
  const [payback, setPayback] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...loanData, [name]: value };
    setLoanData(updatedData);

    if (name === 'amount' && updatedData.loanType) {
      calculatePayback(updatedData.loanType, parseInt(value));
    }
  };

  const calculatePayback = (loanType, amount) => {
    let interestRate = 0, days = 0;
    if (amount >= 5000 && amount <= 20000) { interestRate = 0.10; days = 90; }
    else if (amount >= 21000 && amount <= 150000) { interestRate = 0.12; days = 150; }
    else if (amount >= 150000 && amount <= 500000) { interestRate = 0.15; days = 300; }
    const total = amount + (amount * (interestRate / 100) * days);
    setPayback(total);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!agreed) {
      setMessage("Please agree to the terms.");
      return;
    }
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || !storedUser._id) {
      setMessage("User not logged in");
      return;
    }
    try {
      // Updated API endpoint
      const response = await axios.post(`${API_BASE_URL}/api/loan/apply`, {
        userId: storedUser._id,
        ...loanData
      });
      // Update stored user with new account balance
      const updatedUser = { ...storedUser, accountBalance: response.data.accountBalance };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setMessage(response.data.message || "Loan successfully approved, kindly go to your dashboard to withdraw to your bank account");
    } catch (err) {
      setMessage(err.response?.data?.message || "Loan application error");
    }
  };

  return (
    <div className="loan-container">
      <h2>Loan Application</h2>
      <form onSubmit={handleSubmit}>
        <select name="loanType" onChange={handleChange} required>
          <option value="">Select Loan Type</option>
          <option value="Short">Short Loans (R5,000 - R20,000)</option>
          <option value="Medium">Medium Loans (R21,000 - R150,000)</option>
          <option value="Large">Large Loans (R151,000 - R500,000)</option>
        </select>
        <select name="amount" onChange={handleChange} required>
          <option value="">Select Amount</option>
          <option value="5000">R5,000</option>
          <option value="10000">R10,000</option>
          <option value="15000">R15,000</option>
          <option value="20000">R20,000</option>
          <option value="25000">R25,000</option>
          <option value="30000">R30,000</option>
          <option value="40000">R40,000</option>
          <option value="50000">R50,000</option>
          <option value="60000">R60,000</option>
          <option value="70000">R70,000</option>
          <option value="80000">R80,000</option>
          <option value="90000">R90,000</option>
          <option value="100000">R100,000</option>
          <option value="150000">R150,000</option>
          <option value="200000">R200,000</option>
          <option value="250000">R250,000</option>
          <option value="300000">R300,000</option>
          <option value="400000">R400,000</option>
          <option value="500000">R500,000</option>
        </select>
        {payback > 0 && <p>Total Payback Amount: R {payback.toFixed(2)}</p>}
        <label>
          <input type="checkbox" onChange={e => setAgreed(e.target.checked)} required /> I confirm that the information provided is true and accurate to the best of my knowledge. i understand that providing false information may result in loan denial or legal action. 
        </label>
        <button type="submit">Apply</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Loan;