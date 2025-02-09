// src/components/customer/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, submitRating } from '../../features/customer/orderSlice';
import './Dashboard.css';
import Navbar from './Navbar';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector(state => state.orders || {});
    const [ratings, setRatings] = useState({});

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleRatingChange = (productId, rating) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [productId]: rating
        }));
    };

    const handleRatingSubmit = (productId) => {
        const rating = ratings[productId];
    
        if (!rating) {
            alert("Please select a rating before submitting.");
            return;
        }
    
        dispatch(submitRating({ productId, rating }))
            .unwrap()
            .then(() => {
                alert("Rating submitted successfully!");
            })
            .catch((error) => {
                alert(error || "Failed to submit rating. Please try again.");
            });
    };

    

    return (
        <div>
            <Navbar />
            <div className="dashboard">
                <h2>My Orders</h2>
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Rating</th>  {/* ✅ New column for rating */}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order =>
                            order.items && order.items.length > 0 ? (
                                order.items.map(item => (
                                    <tr key={`${order.id}-${item.id}`}>
                                        <td>{order.id}</td>
                                        <td>{item.product?.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.product?.price}</td>
                                        <td>{order.status}</td>
                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td>
                                            {order.status === "Delivered" ? (
                                                <div>
                                                    <select
                                                        value={ratings[item.product?.id] || ""}
                                                        onChange={(e) => handleRatingChange(item.product?.id, e.target.value)}
                                                    >
                                                        <option value="">Rate</option>
                                                        <option value="1">1 - Poor</option>
                                                        <option value="2">2 - Fair</option>
                                                        <option value="3">3 - Good</option>
                                                        <option value="4">4 - Very Good</option>
                                                        <option value="5">5 - Excellent</option>
                                                    </select>
                                                    <button onClick={() => handleRatingSubmit(item.product?.id)}>
                                                        Submit
                                                    </button>
                                                </div>
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr key={order.id}>
                                    <td colSpan="7">No items in this order.</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
