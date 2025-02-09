//src/components/Shop/AdminNavbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Remove token on logout
    navigate('/'); // Redirect to login page
  };

  return (
    <nav className="admin-navbar">
      <div className="logo">
        <h2>Admin Panel</h2>
      </div>
      <ul className="nav-links">
        <li><Link to="/adminhome">Home</Link></li>
        <li><Link to="/adminproducts">Products</Link></li>
        <li><Link to="/adminorders">Orders</Link></li>
        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
