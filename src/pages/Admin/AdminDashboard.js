// apexloan/src/pages/Admin/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <nav className="admin-nav">
        <ul>
          <li><Link to="/admin/users">User Management</Link></li>
          <li><Link to="/admin/users-details">User Details</Link></li>
          <li><Link to="/admin/messages">Admin Messages</Link></li>
          <li><Link to="/admin/last-login">Last Login Overview</Link></li>
          <li><Link to="/admin/confirm">Admin Confirmation</Link></li>
        </ul>
      </nav>
      <section className="admin-content">
        <p>Select an option from the navigation menu to manage admin functionalities.</p>
      </section>
    </div>
  );
};

export default AdminDashboard;
