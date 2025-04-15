// apexloan/src/pages/Admin/AdminMessages.js
import React, { useState } from 'react';
import axios from 'axios';
import "../../styles/AdminMessages.css";

const AdminMessages = () => {
  const [email, setEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const [feedback, setFeedback] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://apexloanserver.vercel.app/api/users/by-email/${email}`);
      setSearchedUser(response.data);
      setFeedback('');
    } catch (error) {
      setSearchedUser(null);
      setFeedback("User not found");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!searchedUser) {
      setFeedback("Please search for a user first.");
      return;
    }
    try {
      // This endpoint replaces any old notification with the new one.
      await axios.post('https://apexloanserver.vercel.app/api/admin/message', { email, message: messageText });
      setFeedback("Message sent successfully.");
      setMessageText('');
    } catch (err) {
      setFeedback("Error sending message.");
    }
  };

  const handleDelete = async () => {
    if (!searchedUser) {
      setFeedback("Please search for a user first.");
      return;
    }
    try {
      await axios.post('https://apexloanserver.vercel.app/api/admin/delete-message', { userId: searchedUser._id });
      setFeedback("Old notification removed successfully.");
    } catch (err) {
      setFeedback("Error deleting message.");
    }
  };

  return (
    <div className="admin-messages">
      <h2>Send Message to User</h2>
      <div className="search-section">
        <input 
          type="email" 
          placeholder="Enter user Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button onClick={handleSearch}>Search User</button>
      </div>
      <form onSubmit={handleSend}>
        <textarea 
          placeholder="Message" 
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
      <button onClick={handleDelete} className="delete-button">Remove Old Message</button>
      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
};

export default AdminMessages;
