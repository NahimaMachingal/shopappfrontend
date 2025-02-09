import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authApi';
import './Navbar.css';  // Import CSS

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken) || localStorage.getItem("accessToken");

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <nav className="navbar">
      {/* Brand Name */}
      <Link to="/home" className="brand">MiShop</Link>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>

      {/* Logout Button */}
      {accessToken ? (
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      ) : (
        <Link to="/" className="login-btn">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
