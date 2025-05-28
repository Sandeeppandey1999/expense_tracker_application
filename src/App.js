// src/App.js
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import Sidebar from './pages/Sidebar';
import ProtectedRoute from './ProtectedRoute';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import { Toolbar } from '@mui/material';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('accessToken');
  const showSidebar = isAuthenticated && location.pathname !== '/login';

  return (
    <div style={{ display: 'flex' }}>
      {showSidebar && <Sidebar />}
      <div style={{ flexGrow: 1 }}>
        {showSidebar && <Toolbar />} {/* Push content below AppBar/Drawer */}
        {children}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/addTransaction" element={<ProtectedRoute><AddTransaction /></ProtectedRoute>} />
          <Route path="/transactionList" element={<ProtectedRoute><TransactionList /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
