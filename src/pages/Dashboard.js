// apexloan/src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';

const API_BASE_URL = 'https://apexloanserver.vercel.app';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ fullName: '', accountBalance: 0, _id: '', loan: {}, username: '', notifications: [] });
  const [cancelMessage, setCancelMessage] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [msgFeedback, setMsgFeedback] = useState('');

  // Initial load of user details from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
    }
  }, []);

  // Poll for updated notifications every 10 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      if (user._id) {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/users/${user._id}`);
          if (response.data && response.data.notifications) {
            setUser(prev => ({ ...prev, notifications: response.data.notifications }));
            // Update localStorage with latest notifications
            const updatedUser = { ...user, notifications: response.data.notifications };
            localStorage.setItem('user', JSON.stringify(updatedUser));
          }
        } catch (error) {
          console.error("Error fetching notifications", error);
        }
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [user._id, user]);

  const handleCancelLoan = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/loan/cancel`, { userId: user._id });
      setCancelMessage("Loan cancellation request received. If applied within 15 minutes, the loan has been cancelled; otherwise please contact admin for modifications.");
      // Update loan details
      setUser(prev => ({ ...prev, loan: {} }));
    } catch (error) {
      console.error("Error cancelling loan", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!user.username || user.username.trim() === "") {
      setMsgFeedback("Username is required before sending a message.");
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/api/users/message`, {
        userId: user._id,
        message: userMessage
      });
      setMsgFeedback("Message sent successfully.");
      setUserMessage('');
    } catch (error) {
      setMsgFeedback("Error sending message.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user.fullName}</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <div className="account-balance">
        <h3>Account Balance: ZAR {user.accountBalance}</h3>
        <div className="actions">
          <button onClick={() => navigate('/withdraw')} disabled={user.accountBalance < 1}>
            Withdraw
          </button>
          <button onClick={() => window.location.href = "https://forms.gle/VWvE5NSs5C1vqvdcA"}>
            Deposit
          </button>
          {user.loan && user.loan.amount > 0 ? (
            <button onClick={handleCancelLoan}>Cancel Loan</button>
          ) : (
            <button onClick={() => navigate('/loan')}>Apply Loan</button>
          )}
        </div>
        {cancelMessage && <p className="cancel-message">{cancelMessage}</p>}
      </div>
      <div className="messages">
        <h3>Send a Message</h3>
        <form onSubmit={handleSendMessage}>
          <input 
            placeholder="Type your message here" 
            value={userMessage} 
            onChange={e => setUserMessage(e.target.value)} 
            required 
          />
          <button type="submit">Send Message</button>
        </form>
        {msgFeedback && <p>{msgFeedback}</p>}
      </div>
      <div className="notifications">
        <h3>Admin Notifications</h3>
        {user.notifications && user.notifications.length > 0 ? (
          <ul>
            {user.notifications.map((note, idx) => <li key={idx}>{note}</li>)}
          </ul>
        ) : (
          <p>Repayment Loan Period, Short Loan: 90days, Medium Loan: 150 days, Long Loan: 300 days. You can request for a loan period extension. Payback method: Short Loan: You're to pay back minimum of 25% of your loan total payback every month, Medium Loan: minimum of 15% of your loan pay back, Long Loan: minimum of 10% of your loan pay back, is to be paid back every month. For more enquires, Kindly send us a message.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
