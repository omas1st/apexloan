// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Withdraw from './pages/Withdraw';
import ConfirmWithdraw from './pages/ConfirmWithdraw';
import VerifyWithdraw from './pages/VerifyWithdraw';
import Loan from './pages/Loan';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserManagement from './pages/Admin/UserManagement';
import AdminMessages from './pages/Admin/AdminMessages';
import AdminLastLogin from './pages/Admin/AdminLastLogin';
import AdminConfirm from './pages/Admin/AdminConfirm';
import './styles/Home.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/confirm-withdraw" element={<ConfirmWithdraw />} />
        <Route path="/verify-withdraw" element={<VerifyWithdraw />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/last-login" element={<AdminLastLogin />} />
        <Route path="/admin/confirm" element={<AdminConfirm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
