// src/components/Customer/Cart.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Cart.css';
import { fetchCartItems, removeCartItem, updateCartQuantity } from '../../features/customer/customerSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, status, error } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 0) {
      dispatch(updateCartQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeCartItem(productId));
  };
  const handleBuy = () => {
    navigate("/user-address");
  };

  return (
    <div>
        <Navbar />
    
    <div className="cart-container">
      <h2>Your Cart</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      <div className="cart-list">
        {cart.map((item, index) => (
          <div key={`${item.product}-${index}`} className="cart-item">
            <img src={item.product_image} alt={item.product_name} className="cart-product-image" />
            <h3>{item.product_name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.product_price}</p>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(item.product, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.product, item.quantity + 1)}>+</button>
            </div>
            <p>Total: ${item.quantity * item.product_price}</p>
            <button className="remove-btn" onClick={() => handleRemove(item.product)}>Remove</button>
            <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                  onClick={handleBuy}
                >
                  Buy
                </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Cart;
