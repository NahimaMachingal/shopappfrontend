// src/components/Auth/Login.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await dispatch(loginUser(values));
      const userType = response.user.user_type;
      if (userType === 'customer') navigate('/home');
      else if (userType === 'admin') navigate('/adminhome');
    } catch (error) {
      setError('User is not verified');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={handleLogin}>
          <Form>
            <div className="form-group">
              <div className="input-container">
                <FaUser className="input-icon" />
                <Field type="email" name="email" className="form-input" placeholder="Type your username" />
              </div>
              <ErrorMessage name="email" component="p" className="error-message" />
            </div>
            <div className="form-group">
              <div className="input-container">
                <FaLock className="input-icon" />
                <Field type="password" name="password" className="form-input" placeholder="Type your password" />
              </div>
              <ErrorMessage name="password" component="p" className="error-message" />
            </div>
            
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? <span className="loader"></span> : 'LOGIN'}
            </button>
          </Form>
        </Formik>
       
        <div className="signup-link"><span onClick={() => navigate('/register')}>Sign Up</span></div>
      </div>
    </div>
  );
};

export default Login;
