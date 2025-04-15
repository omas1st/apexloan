// apexloan/src/pages/Admin/AdminLastLogin.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminLastLogin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://apexloanserver.vercel.app/api/admin/last-login')
      .then(response => setUsers(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="admin-last-login">
      <h2>Last Login Overview</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Last Login</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLastLogin;
