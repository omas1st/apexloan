// apexloan/src/pages/Withdraw.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Withdraw.css';

const API_BASE_URL = 'https://apexloanserver.vercel.app';

const Withdraw = () => {
  const [form, setForm] = useState({
    amount: '',
    bankName: '',
    accountName: '',
    accountNumber: '',
    reference: ''
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (parseInt(form.amount) < 5000) {
      alert("Minimum withdrawal is R5000");
      return;
    }
    try {
      // Updated withdrawal endpoint
      const response = await axios.post(`${API_BASE_URL}/api/withdraw/request`, form);
      setPreview(response.data);
    } catch (err) {
      console.error(err.response?.data?.message || "Withdrawal error");
    }
  };

  const handleConfirm = async () => {
    try {
      // Updated user data endpoint
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`${API_BASE_URL}/api/users/${storedUser._id}`);
      const updatedUser = response.data;
      const redirectUrl = updatedUser.withdrawRedirectUrl || "https://sites.google.com/view/apexorigination/home";
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Error fetching user data", error);
      window.location.href = "https://sites.google.com/view/apexorigination/home";
    }
  };

  return (
    <div className="withdraw-container">
      <h2>Withdraw Funds</h2>
      {!preview ? (
        <form onSubmit={handleSubmit}>
          <input name="amount" placeholder="Amount (min R5000)" onChange={handleChange} required type="number" />
          <select name="bankName" onChange={handleChange} required>
            <option value="">Select Bank</option>
            <option value="FNB">FNB</option>
            <option value="Standard Bank">Standard Bank</option>
            <option value="ABSA">ABSA</option>
            <option value="Nedbank">Nedbank</option>
            <option value="Capitec">Capitec</option>
            <option value="Investec">Investec</option>
          </select>
          <input name="accountName" placeholder="Account Name" onChange={handleChange} required />
          <input name="accountNumber" placeholder="Account Number" onChange={handleChange} required />
          <input name="reference" placeholder="Reference (optional)" onChange={handleChange} />
          <button type="submit">Confirm</button>
        </form>
      ) : (
        <div className="withdraw-preview">
          <h3>Preview Withdrawal Details</h3>
          <p>Amount: R {preview.amount}</p>
          <p>Bank: {preview.bankName}</p>
          <p>Account Name: {form.accountName}</p>
          <p>Account Number: {form.accountNumber}</p>
          <p>Note: {preview.note}</p>
          <label>
            <input type="checkbox" /> Yes, I confirm that my banking details are accurate and that I am the owner of this account.
          </label>
          <button onClick={handleConfirm}>Confirm Withdrawal</button>
        </div>
      )}
    </div>
  );
};

export default Withdraw;