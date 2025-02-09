// src/components/Auth/Register.jsx
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'; 

const Register = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        username: Yup.string().required('Username is required'),
        first_name: Yup.string().required('First name is required'),
        last_name: Yup.string().required('Last name is required'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        confirm_password: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        user_type: Yup.string().required('User type is required'),
    });

    const handleSubmit = async (values) => {
        try {
            // Send both password and confirm_password to match backend expectations
            const response = await axios.post("https://shopappbackend-w541.onrender.com/register/", values);
            
            if (response.status === 201) {
                toast.success("Registered Successfully", { position: "top-center", autoClose: 3000 });
                setTimeout(() => navigate("/"), 3000);
            }
        } catch (err) {
            // Display the specific error message from the backend if available
            const errorMessage = err.response?.data?.error || "Registration failed. Please try again.";
            toast.error(errorMessage, { position: "top-center" });
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2 className="register-title">Register</h2>
                <Formik
                    initialValues={{ email: '', username: '', first_name: '', last_name: '', password: '', confirm_password: '', user_type: 'customer' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div className="form-group">
                            <div className="input-container">
                                <Field type="email" name="email" className="input-field" placeholder="Email" />
                            </div>
                            <ErrorMessage name="email" component="p" className="error-text" />
                        </div>

                        <div className="form-group">
                            <div className="input-container">
                                <Field type="text" name="username" className="input-field" placeholder="Username" />
                            </div>
                            <ErrorMessage name="username" component="p" className="error-text" />
                        </div>

                        <div className="form-group">
                            <div className="input-container">
                                <Field type="text" name="first_name" className="input-field" placeholder="First Name" />
                            </div>
                            <ErrorMessage name="first_name" component="p" className="error-text" />
                        </div>

                        <div className="form-group">
                            <div className="input-container">
                                <Field type="text" name="last_name" className="input-field" placeholder="Last Name" />
                            </div>
                            <ErrorMessage name="last_name" component="p" className="error-text" />
                        </div>

                        <div className="form-group">
                            <div className="input-container">
                                <Field type="password" name="password" className="input-field" placeholder="Password" />
                            </div>
                            <ErrorMessage name="password" component="p" className="error-text" />
                        </div>

                        <div className="form-group">
                            <div className="input-container">
                                <Field type="password" name="confirm_password" className="input-field" placeholder="Confirm Password" />
                            </div>
                            <ErrorMessage name="confirm_password" component="p" className="error-text" />
                        </div>

                        <button type="submit" className="register-button">Register</button>
                    </Form>
                </Formik>

                <p className="login-link">
                    Already have an account? <span onClick={() => navigate('/login')}>Login</span>
                </p>
            </div>
        </div>
    );
};

export default Register;

