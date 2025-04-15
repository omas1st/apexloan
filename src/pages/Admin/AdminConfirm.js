// apexloan/src/pages/Admin/AdminConfirm.js
import React, { useState } from 'react';
import axios from 'axios';
import "../../styles/AdminConfirmation.css";

const AdminConfirm = () => {
  const [searchEmail, setSearchEmail] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [urls, setUrls] = useState(Array(10).fill({ url: '', approved: false }));
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://apexloanserver.vercel.app/api/users/by-email/${searchEmail}`);
      setUserProfile(response.data);
      setMessage('');
    } catch (error) {
      setUserProfile(null);
      setMessage("User not found");
    }
  };

  const handleUrlChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index] = { ...newUrls[index], [field]: value };
    setUrls(newUrls);
  };

  const handleSubmitConfig = async () => {
    try {
      const response = await axios.post('https://apexloanserver.vercel.app/api/admin/confirm-url', {
        userId: userProfile._id,
        urls: urls,
      });
      // Update userProfile so approved URL remains visible
      setUserProfile({ ...userProfile, withdrawRedirectUrl: response.data.redirectUrl });
      setMessage(`Configuration saved. Withdraw confirm button will redirect to: ${response.data.redirectUrl}`);
    } catch (error) {
      setMessage("Error updating confirmation configuration");
    }
  };

  return (
    <div className="admin-confirmation">
      <h2>Admin Confirmation</h2>
      <div className="search-section">
        <input
          type="text"
          placeholder="Enter user email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {message && <p>{message}</p>}
      {userProfile && (
        <div className="profile-section">
          <h3>User Profile</h3>
          <p><strong>Name:</strong> {userProfile.fullName}</p>
          <p><strong>Email:</strong> {userProfile.email}</p>
          {userProfile.withdrawRedirectUrl && (
            <p><strong>Current Approved URL:</strong> {userProfile.withdrawRedirectUrl}</p>
          )}
          <div className="url-config-section">
            {urls.map((item, index) => (
              <div key={index} className="url-entry">
                <input
                  type="text"
                  placeholder={`URL ${index + 1}`}
                  value={item.url}
                  onChange={(e) => handleUrlChange(index, 'url', e.target.value)}
                />
                <label>
                  Approve?
                  <input
                    type="checkbox"
                    checked={item.approved}
                    onChange={(e) => handleUrlChange(index, 'approved', e.target.checked)}
                  />
                </label>
              </div>
            ))}
            <button onClick={handleSubmitConfig}>Submit Configuration</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminConfirm;
