// apexloan/src/pages/Admin/AdminUsersDetails.js
import React, { useState } from 'react';
import axios from 'axios';
import "../../styles/AdminUsersDetails.css";

const AdminUsersDetails = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://apexloanserver.vercel.app/api/users/by-email/${searchQuery}`);
      setUserDetails(response.data);
      setMessage('');
    } catch (error) {
      setUserDetails(null);
      setMessage("User not found");
    }
  };

  return (
    <div className="admin-users-details">
      <h2>Admin Users Details</h2>
      <input 
        type="text" 
        placeholder="Enter user email" 
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {message && <p>{message}</p>}
      {userDetails && (
        <div className="user-details">
          <h3>User Details</h3>
          <p><strong>Full Name:</strong> {userDetails.fullName}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Identity Number:</strong> {userDetails.identityNumber}</p>
          <p><strong>Date of Birth:</strong> {userDetails.dateOfBirth ? new Date(userDetails.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Occupation:</strong> {userDetails.occupation}</p>
          <p><strong>WhatsApp:</strong> {userDetails.whatsapp}</p>
          <p><strong>Country:</strong> {userDetails.country}</p>
          <p><strong>Home Address:</strong> {userDetails.homeAddress}</p>
          <p><strong>Username:</strong> {userDetails.username}</p>
          <p><strong>Account Balance:</strong> {userDetails.accountBalance}</p>
          {userDetails.withdrawRedirectUrl && (
            <p><strong>Withdraw Redirect URL:</strong> {userDetails.withdrawRedirectUrl}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUsersDetails;
