// apexloan/src/pages/Admin/UserManagement.js
import React, { useState } from 'react';
import axios from 'axios';
import "../../styles/AdminUserManagement.css";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [balanceUpdate, setBalanceUpdate] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://apexloanserver.vercel.app/api/users/by-email/${searchQuery}`);
      setSearchedUser(response.data);
      setMessage('');
    } catch (error) {
      setSearchedUser(null);
      setMessage("User not found");
    }
  };

  // Update user's account balance
  const handleUpdateBalance = async () => {
    try {
      await axios.put(`https://apexloanserver.vercel.app/api/users/${searchedUser._id}`, { accountBalance: balanceUpdate });
      setMessage("Account balance updated successfully");
      setSearchedUser({ ...searchedUser, accountBalance: balanceUpdate });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating balance");
    }
  };

  // Cancel user's loan – admin override
  const handleCancelUserLoan = async () => {
    try {
      await axios.post('https://apexloanserver.vercel.app/api/loan/cancel', { userId: searchedUser._id, adminCancel: true });
      setMessage("User's loan cancelled and account balance cleared");
      setSearchedUser({ 
        ...searchedUser, 
        accountBalance: 0, 
        loan: { amount: 0, loanType: null, appliedAt: null } 
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error cancelling loan");
    }
  };

  return (
    <div className="admin-user-management">
      <h2>User Management</h2>
      <div className="search-user">
        <input 
          type="email" 
          placeholder="Enter user email" 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {message && <p className="message">{message}</p>}
      {searchedUser && (
        <div className="user-details">
          <h3>User Details</h3>
          <p><strong>Full Name:</strong> {searchedUser.fullName}</p>
          <p><strong>Email:</strong> {searchedUser.email}</p>
          <p><strong>Username:</strong> {searchedUser.username}</p>
          <p><strong>Identity Number:</strong> {searchedUser.identityNumber || "N/A"}</p>
          <p><strong>Date of Birth:</strong> {searchedUser.dateOfBirth ? new Date(searchedUser.dateOfBirth).toLocaleDateString() : "N/A"}</p>
          <p><strong>Occupation:</strong> {searchedUser.occupation || "N/A"}</p>
          <p><strong>WhatsApp:</strong> {searchedUser.whatsapp || "N/A"}</p>
          <p><strong>Country:</strong> {searchedUser.country || "N/A"}</p>
          <p><strong>Home Address:</strong> {searchedUser.homeAddress || "N/A"}</p>
          <p><strong>Account Balance:</strong> {searchedUser.accountBalance}</p>
          <p><strong>Loan Amount:</strong> {searchedUser.loan && searchedUser.loan.amount ? searchedUser.loan.amount : 0}</p>
          <p><strong>Withdraw Redirect URL:</strong> {searchedUser.withdrawRedirectUrl}</p>
          <div className="edit-actions">
            <div className="balance-update">
              <input
                type="number"
                placeholder="New Account Balance"
                value={balanceUpdate}
                onChange={e => setBalanceUpdate(e.target.value)}
              />
              <button onClick={handleUpdateBalance}>Update Balance</button>
            </div>
            <div className="loan-cancel">
              <button onClick={handleCancelUserLoan}>Cancel Loan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
